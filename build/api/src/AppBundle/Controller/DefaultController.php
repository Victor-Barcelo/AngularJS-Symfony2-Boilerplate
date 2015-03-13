<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Lib\Scraper;

class DefaultController extends Controller
{
    /**
     * @Route("/Ng-ex2/build/api/scrape/{langFrom}/{langTo}/{url}/{cssSelector}", name="getScrapedData")
     */
    public function getScrapedDataAction($langFrom, $langTo, $url, $cssSelector)
    {
        $sc = new Scraper($langFrom, $langTo, 'http://victorbarcelo.net/', $cssSelector);
        $nodes = $sc->getNodes();

        $return = json_encode(array("data" => $nodes));
//        $return = json_encode(array("data" => $langFrom . $langTo . $url . $cssSelector));
        return new Response(
            $return, 200, array('Content-Type' => 'application/json')
        );
    }
}
