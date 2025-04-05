import ollama
import sys_msgs
import requests
import trafilatura
from bs4 import BeautifulSoup
import urllib.parse
from duckduckgo_search import DDGS
import web

def best_search_results(s_results, query):
    # print("HELLOOOO")
    sys_msg = sys_msgs.best_search_msg
    # bes_msg = f'SEARCH_RESULTS: {s_results} \nUSER_PROMPT: {assistant_convo[-1]} \nSEARCH_QUERY: {query}'
    bes_msg = f'SEARCH_RESULTS: {s_results} \nUSER_PROMPT:Whats the Date Today \nSEARCH_QUERY: {query}'

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
            print("RESPONSEE", response_msg)
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
best_search_results(web.results,'Weather Housatan , Usa')