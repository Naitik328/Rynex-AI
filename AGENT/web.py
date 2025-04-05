import trafilatura
import ollama
import sys_msgs
import requests
import trafilatura
from bs4 import BeautifulSoup
import urllib.parse
# def scrape_webpage(url):
#     try:
#         url = url.strip()  # Remove spaces
#         print("SCRAPING WEB PAGE:", url)
        
#         downloaded = trafilatura.fetch_url(url) or trafilatura.download_page(url)
        
#         if not downloaded:
#             print("Failed to fetch content.")
#             return None
        
#         return trafilatura.extract(downloaded, include_formatting=True, include_links=True)
    
#     except Exception as e:
#         print(f"Error: {e}")
#         return None

# a = scrape_webpage('https://www.goodreturns.in/gold-rates/')
# print(a)


# def duckduckgo_search(query):
#     headers = {
#         "User-Agent": ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
#                        "AppleWebKit/537.36 (KHTML, like Gecko) "
#                        "Chrome/122.0.0.0 Safari/537.36"),
#     }
    
#     url = f'https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}'
#     response = requests.get(url, headers=headers)
    
#     if response.status_code != 200:
#         print("Failed to fetch results")
#         return []
    
#     soup = BeautifulSoup(response.text, 'html.parser')
#     results = []

#     for i, result in enumerate(soup.find_all('div', class_='result'), start=1):
#         if i > 5:
#             break

#         title_tag = result.find('a', class_='result__a')
#         snippet_tag = result.find('div', class_='result__snippet')

#         if not title_tag:
#             continue

#         # Extract the real URL
#         raw_link = title_tag['href']
#         parsed_url = urllib.parse.urlparse(raw_link)
#         query_params = urllib.parse.parse_qs(parsed_url.query)
#         actual_link = query_params.get('uddg', [None])[0]

#         snippet = snippet_tag.text.strip() if snippet_tag else 'No description available'

#         if actual_link:
#             results.append({
#                 'id': i,
#                 'link': actual_link,
#                 'search_description': snippet
#             })

#     return results
# duckduckgo_search("Weather New Delhi")
# from duckduckgo_search import DDGS

# def duckduckgo_search(query):
#     with DDGS() as ddgs:
#         results = ddgs.text(query, max_results=5)
    
#     formatted_results = []
#     for i, result in enumerate(results, start=1):
#         formatted_results.append({
#             'id': i,
#             'link': result['href'],
#             'search_description': result['body']
#         })
    
#     return formatted_results

# # Test the function
# results = duckduckgo_search("Weather Housatan , Usa")

# print(results)
# for res in results:
#     print(res)

def search_or_not():
    sys_msg= sys_msgs.search_or_not_msg
    assistant_convo = '''35°C
RealFeel®
33°
Hazy clouds
More Details
Wind
WNW 12 km/h
Wind Gusts
26 km/h
Air Quality
Unhealthy
](/en/in/new-delhi/187745/current-weather/187745)

## Current Weather

7:19 PM

## Hourly Weather

## 10-Day Weather Forecast

[
21°
Lo
0%
](/en/in/new-delhi/187745/weather-today/187745)

Tonight

4/2

Hazy

[
37°
22°
0%
](/en/in/new-delhi/187745/weather-tomorrow/187745)

Thu

4/3

Hazy and hot

Night: Partly cloudy

[
37°
22°
0%
](/en/in/new-delhi/187745/daily-weather-forecast/187745?day=3)

Fri

4/4

Hazy and hot

Hazy

[
37°
22°
0%
](/en/in/new-delhi/187745/daily-weather-forecast/187745?day=4)

Sat

4/5

Hazy and very warm

Hazy

[
38°
25°
0%
](/en/in/new-delhi/187745/daily-weather-forecast/187745?day=5)

Sun

4/6

Hazy and hot

Hazy and warm

[
41°
26°
0%
](/en/in/new-delhi/187745/daily-weather-forecast/187745?day=6)

Mon

4/7

Hazy and very hot

Hazy and warm

[
40°
26°
0%
](/en/in/new-delhi/187745/daily-weather-forecast/187745?day=7)

Tue

4/8

Hazy and very hot

Hazy and warm

[
42°
27°
0%
](/en/in/new-delhi/187745/daily-weather-forecast/187745?day=8)

Wed

4/9

Mainly cloudy and very hot

Hazy and very warm

[
42°
26°
1%
](/en/in/new-delhi/187745/daily-weather-forecast/187745?day=9)

Thu

4/10

Hazy and very hot

Mainly clear and warm

[
41°
27°
2%
](/en/in/new-delhi/187745/daily-weather-forecast/187745?day=10)

Fri

4/11

Partly sunny and very hot

Turning cloudy and warm

## Sun & Moon

[
Air Quality
Unhealthy
](/en/in/new-delhi/187745/air-quality-index/187745)

## Air Quality

See MoreHealth effects can be immediately felt by sensitive groups. Healthy individuals may experience difficulty breathing and throat irritation with prolonged exposure. Limit outdoor activity.

## Allergy Outlook

[See All](/en/in/new-delhi/187745/health-activities/187745)
VALID DATA True
CONTEXT: [
35°C
RealFeel®
33°
Hazy clouds
More Details
Wind
WNW 12 km/h
Wind Gusts
26 km/h
Air Quality
Unhealthy
](/en/in/new-delhi/187745/current-weather/187745)

## Current Weather

7:19 PM

## Hourly Weather

## 10-Day Weather Forecast

[
21°
Lo
0%
](/en/in/new-delhi/187745/weather-today/187745)

Tonight

4/2

Hazy

[
37°
22°
0%
](/en/in/new-delhi/187745/weather-tomorrow/187745)

Thu

4/3

Hazy and hot

Night: Partly cloudy

[
37°
22°
0%
](/en/in/new-delhi/187745/daily-weather-forecast/187745?day=3)

Fri

4/4

Hazy and hot

Hazy

[
37°
22°
0%
](/en/in/new-delhi/187745/daily-weather-forecast/187745?day=4)

Sat

4/5

Hazy and very warm

Hazy

[
38°
25°
0%
](/en/in/new-delhi/187745/daily-weather-forecast/187745?day=5)

Sun

4/6

Hazy and hot

Hazy and warm

[
41°
26°
0%
](/en/in/new-delhi/187745/daily-weather-forecast/187745?day=6)

Mon

4/7

Hazy and very hot

Hazy and warm

[
40°
26°
0%
](/en/in/new-delhi/187745/daily-weather-forecast/187745?day=7)

Tue

4/8

Hazy and very hot

Hazy and warm

[
42°
27°
0%
](/en/in/new-delhi/187745/daily-weather-forecast/187745?day=8)

Wed

4/9

Mainly cloudy and very hot

Hazy and very warm
'''
    # print('Latest message',assistant_convo)
    response = ollama.chat(
        model='llama3.2',
        messages=[{'role':'system','content':sys_msg},assistant_convo]
    )
    
    content = response['message']['content']
    print(f'SEARCH ON WEB OR NOT: {content}')

    if'true' in content.lower():
        return True
    else:
        return False

a = search_or_not()
print(a)