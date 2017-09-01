# Wikipedia API Module
Small object for making an ajax request to the Wikipedia.org API.

## Demo
Open wiki_api_test.html in a browser and try searching for terms. A
list of up to 10 extracts from Wikipedia pages matching the search
are displayed along with links to the articles.

## Using the wpAPI Object
Include the code for the wpAPI object in wpAPI.js. Make a call to the
ajaxArticleSearch metho passing the search string and a callback. The
first argument passed to the callback is an array of article objects.
(see table)

| Property   | Type      | Description
| -------    | :-------  | :-------                
| title      | string    | title of the wikipedia page
| text		 | string    | 200 word extract from the page
| url	     | string    | url for article - this property is not fully tested

## Customizing
Refer to the documentation from Wikipedia to customoze the AJAX
request parameters.

[https://www.mediawiki.org/wiki/API:Search](https://www.mediawiki.org/wiki/API:Search)
