<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Lib\Scraper;

class MainController extends Controller
{
    /**
     * @Route("/Ng-ex2/build/api/scrape/{langFrom}/{langTo}/{cssSelector}/{url}", name="getScrapedData")
     */
    public function getScrapedDataAction($langFrom, $langTo, $cssSelector, $url)
    {
//        $sc = new Scraper($langFrom, $langTo, 'http://victorbarcelo.net/', $cssSelector);
//        echo $url;
        $url = urldecode($url);
        $cssSelector = urldecode($cssSelector);
//        echo $cssSelector;
        $sc = new Scraper($langFrom, $langTo, $cssSelector, $url);
        $nodes = $sc->getNodes();

        $return = json_encode(array("data" => $nodes));

//        $return = json_encode(array("data" => $langFrom . $langTo . $url . $cssSelector));
        return new Response(
            $return, 200, array('Content-Type' => 'application/json')
        );
    }
}
