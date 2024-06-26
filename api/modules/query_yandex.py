import aiohttp
import os
from typing import List
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get API key from local environment variable
API_KEY = os.getenv('API_KEY')
# Get whether or not we are dployed from local environment variable
DEPLOYED = os.getenv('DEPLOYED')

async def query_yandex_for_synonyms(word: str) -> List[str]:
    """
    Asynchronously query the Yandex Dictionary API for synonyms of a given word.

    Args:
        word (str): The word for which synonyms are to be retrieved.

    Returns:
        List[str]: A list of synonyms for the word.

    Raises:
        aiohttp.ClientResponseError: If the HTTP request to the Yandex API fails,
                                     this exception is raised with detailed error information.
    """
    # proxy is needed when deployed on pythonanywhere
    proxy = 'http://proxy.server:3128' if DEPLOYED == 'true' else None
    url = f'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key={API_KEY}&lang=ru-ru&text={word}'
    async with aiohttp.ClientSession() as session:
        async with session.get(url, proxy=proxy) as response:
            if response.status != 200:
                error_message = await response.text()
                raise aiohttp.ClientResponseError(
                    request_info=response.request_info, 
                    history=response.history, 
                    status=response.status,
                    message=error_message, 
                    headers=response.headers
                )
            data = await response.json()
    # find synonyms from the word data
    # data is a dictionary returned from yandex's dictionary translation api
    # it can return a def array, which has a set of translations with relevant 
    # synonyms to that translation, we take all the synonyms from the translations
    # and the translations themselves as a list of synonyms for the current word.
    synonyms = []
    for definition in data.get('def', []):
        synonyms += [tr['text'] for tr in definition.get('tr', [])]
        synonyms += [syn['text'] for tr in definition.get('tr', []) for syn in tr.get('syn', []) if 'text' in syn]
    return synonyms