@added
-adv search form, input, button
-collection, museum, library html.page

@database SEARCH CLUSTER for union search

Description_web
[SEARCH_CLUSTER]
KEYWORD_CLUSTER=REFD,TITLE,PHYSICAL_DESC,SCOPE,ASSOCIATED_MAT;

Biblio_web
[SEARCH_CLUSTER]
KEYWORD_CLUSTER=TITLE,SUBJECT_WORD,AUTHOR_WORD,SERIES_WORD,520_A;

Collections_web
[SEARCH_CLUSTER]
KEYWORD_CLUSTER=LEGAL_TITLE,ACCESSION_NUMBER,obj_description;

@mwi EXPRESSION at each database profile
expression: QUERY_EXPRESSION

@adv test query

collections
-LEGAL_TITLE Incomplete Scan orACCESSION_NUMBER 2024.001.506

biblio
-ALL_TITLE_WORD Learn PostgreSQL or SUBJECT_WORD Software Testing

description
-TITLE Order of Ontario or DESC_TYPE Private