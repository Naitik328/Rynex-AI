import ollama
import sys_msgs
import requests
import trafilatura
from bs4 import BeautifulSoup
import urllib.parse
from duckduckgo_search import DDGS



assistant_convo=[sys_msgs.assistant_msg]

def search_or_not():
    sys_msg= sys_msgs.search_or_not_msg
    print('Latest message',assistant_convo[-1])
    response = ollama.chat(
        model='gemma3:4b',
        messages=[{'role':'system','content':sys_msg},assistant_convo[-1]]
    )
    
    content = response['message']['content']
    print(f'SEARCH ON WEB OR NOT: {content}')

    if'true' in content.lower():
        return True
    else:
        return False



def query_generator():
    sys_msg = sys_msgs.query_msg
    query_msg = f"CREATE A SEARCH QUERY FOR THIS PROMPT: \n {assistant_convo[-1]}"
    response = ollama.chat(
        model="llama3.2",
        messages=[
            {'role': 'system', 'content': sys_msg},
            {'role': 'user', 'content': query_msg}
        ]
    )
    print("Generated search QUERY:", response['message']['content'])
    return response['message']['content']

def duckduckgo_search(query):
    with DDGS() as ddgs:
        results = ddgs.text(query, max_results=5)
    
    formatted_results = []
    for i, result in enumerate(results, start=1):
        formatted_results.append({
            'id': i,
            'link': result['href'],
            'search_description': result['body']
        })
    
    return formatted_results


def best_search_results(s_results, query):
    sys_msg = sys_msgs.best_search_msg
    bes_msg = f'SEARCH_RESULTS: {s_results} \nUSER_PROMPT: {assistant_convo[-1]} \nSEARCH_QUERY: {query}'

    for attempt in range(2):  # Try twice
        try:
            response = ollama.chat(
                model='llama3.2',
                messages=[
                    {'role': 'system', 'content': sys_msg},
                    {'role': 'user', 'content': bes_msg}
                ]
            )

            response_msg = response.get('message', {}).get('content', "").strip()
            if not response_msg:
                print(f"[Attempt {attempt+1}] AI response is empty.")
                continue

            best_index = int(response_msg)
            if 0 <= best_index < len(s_results):
                return best_index
            else:
                print(f"[Attempt {attempt+1}] AI returned an invalid index: {best_index}")

        except ValueError:
            print(f"[Attempt {attempt+1}] AI response is not a valid integer: {response_msg}")
        except Exception as e:
            print(f"[Attempt {attempt+1}] Error: {e}")

    print("AI failed to determine the best result. Defaulting to index 0.")
    return 0

def scrape_webpage(url):
    try:
        if not url or not isinstance(url, str):
            print("Invalid URL")
            return None
        
        url = url.strip()  # Remove extra spaces
        print("SCRAPING WEB PAGE:", url)

        # Use requests with a User-Agent to mimic a browser
        headers = {
            "User-Agent": ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                           "AppleWebKit/537.36 (KHTML, like Gecko) "
                           "Chrome/122.0.0.0 Safari/537.36")
        }
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code != 200:
            print(f"Failed to fetch content. Status Code: {response.status_code}")
            return None
        
        # Use trafilatura to extract text from the HTML content
        extracted = trafilatura.extract(response.text, include_formatting=True, include_links=True)
        if not extracted:
            print("Failed to extract meaningful content.")
            return None

        return extracted
    
    except Exception as e:
        print(f"Error: {e}")
        return None

def ai_search():
    context = None
    print("GENERATING SEARCH QUERY...")
    search_query = query_generator().strip('"') 

    search_results = duckduckgo_search(search_query)
    print('SEARCH RESULTS', search_results)
    
    if not search_results:
        print("No search results found!")
        return None

    # Get first 5 search results (or as many as are available)
    top_results = search_results[:5]
    if len(top_results) == 0:
        print("No valid search results found.")
        return None

    try:
        # Get best result index among the top results
        best_result_idx = best_search_results(s_results=top_results, query=search_query)
        print('BEST RESULT INDEX:', best_result_idx)

        if best_result_idx is None or best_result_idx >= len(top_results):
            print("Invalid best result index, skipping...")
            return None

        # Get the best page link
        page_link = top_results[0].get('link')
        if not page_link:
            print("No valid link found.")
            return None
        
        print("SCRAPING PAGE:", page_link)
        page_text = scrape_webpage(page_link)
        # print("PAGE TEXT", page_text)
        
        if page_text:
            print("PAGE TEXT PREVIEW:", page_text)
            # return context
        else:
            print("No content extracted from the page.")

        print("VALID DATA", contains_data_needed(search_content=page_text, query=search_query))
        if page_text and True:
            context = page_text
            return context
        else:
            print('No Context Found')

    except Exception as e:
        print(f"Error occurred: {e}")
    
    return context



def contains_data_needed(search_content, query):
    sys_msg = sys_msgs.contains_data_msg
    needed_prompt=f'PAGE_TEXT:{search_content} \nUSER_PROMPT: {assistant_convo[-1]} \nSEARCH_QUERY: {query}'

    response = ollama.chat(
        model= 'llama3.2',
        messages=[{'role':'system', 'content':sys_msg},{'role':'user','content':needed_prompt}]
    )
    content = response['message']['content']
    if 'true' in content.lower():
        return True
    else:
        return False



def stream_assistant_response():
    global assistant_convo
    response_stream= ollama.chat(model="llama3.2",messages=assistant_convo,stream=True)
    complete_response=''
    print('Assistant:')

    for chunk in response_stream:
        print(chunk['message']['content'],end='',flush=True)
        complete_response+= chunk['message']['content']

    assistant_convo.append({'role':'assistant','content':complete_response})
    print('\n')

def main():
    global assistant_convo

    while True:
        prompt = input('User: \n')
        if prompt == 'exit':
            break
        
        assistant_convo.append({'role': 'user', 'content': prompt})
        
        if search_or_not():
            context = ai_search()
            assistant_convo.append({'role': 'user', 'content': prompt})
            
            if search_or_not():
                context = ai_search()
                assistant_convo = assistant_convo[:-1]    
                
                if context:
                    prompt = f'SEARCH RESULT: {context} \n\nUSER PROMPT:{prompt}'
                else:
                    prompt = (
                        f'USER PROMPT: \n{prompt} \n\nFAILED SEARCH: \nThe '
                        'AI search model was unable to extract any reliable data. Explain that' 
                        'and ask if the user would like you to search again or respond ' 
                        'without web search context. Do not respond if a search was needed ' 
                        'and you are getting this message with anything but the above request '
                        'of how the user would like to proceed'
                    )
                assistant_convo.append({'role': 'user', 'content': prompt})
                print("CONTEXT:",context)

        stream_assistant_response()
        print(assistant_convo)

if __name__ =='__main__':
    main()
