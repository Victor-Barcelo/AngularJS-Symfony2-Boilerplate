<?php

namespace AppBundle\Lib;
use Goutte\Client;
use Stichoza\Google\GoogleTranslate;

class Scraper {
    private $client;
    private $url;
    private $cssSelector;
    private $langFrom;
    private $langTo;

    public function __construct($langFrom, $langTo, $url, $cssSelector)
    {
        $this->client = new Client();
        $this->url = $url;
        $this->cssSelector = $cssSelector;
        $this->langFrom = $langFrom;
        $this->langTo = $langTo;
    }

    public function getNodes()
    {
        $nodes = array();
        $crawler = $this->client->request('GET', $this->url);
        $crawler->filter($this->cssSelector)->each(
            function ($node) use (&$nodes){
                $nodes[] = GoogleTranslate::staticTranslate($node->text(), $this->langFrom, $this->langTo);
            }
        );
        return $nodes;
    }
}