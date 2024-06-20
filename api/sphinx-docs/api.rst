API documentation
=================


This document provides an overview of the available API endpoints and their usage.

.. contents:: Table of Contents
   :local:

Default Endpoint
----------------

.. http:get:: /

   Returns the react.js frontend app.

   **Example request**:

   .. sourcecode:: http

      GET / HTTP/1.1
      Host: michealnestor.pythonanywhere.com

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: text/html

      (HTML content of index.html)

Scan Text Endpoint
------------------

.. http:post:: /scantext/

   Processes a string of words and returns the frequency rank of each word, synonyms and its lemma.

   **Example request**:

   .. sourcecode:: http

      POST /scantext/ HTTP/1.1
      Host: michealnestor.pythonanywhere.com
      Accept: application/json

      {
         "text": "The text to be processed.",
         "stopwords": ["a", "an", "the"]
      }

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json, text/javascript

      {
         "be": {
            "lemma": "be",
            "rank": -1,
            "synonyms":[]
         },
         "processed": {
            "lemma": "processed",
            "rank": -1,
            "synonyms": []
         },
         "text": {
            "lemma": "text",
            "rank": -1,
            "synonyms": []
         },
         "the": {
            "lemma": "the",
            "rank": -1,
            "synonyms": []
         },
         "to": {
            "lemma": "to",
            "rank": -1,
            "synonyms":[]
         }
      }

   :statuscode 200: No error
   :statuscode 400: Bad request