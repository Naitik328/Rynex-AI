import trafilatura
import ollama
import sys_msgs
import requests
import trafilatura
from bs4 import BeautifulSoup
import urllib.parse


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
        print(extracted)
        return extracted
    
    except Exception as e:
        print(f"Error: {e}")
        return None
    
scrape_webpage('https://www.calendardate.com/todays.htm')