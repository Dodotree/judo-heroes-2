<?php

namespace Tensor\CoreBundle\Functions;

class ApiFunctions
{
    public function __construct($em, $container)
    {
        $this->em = $em;
        $this->container = $container;
        $this->user = $container->get('security.token_storage')->getToken()->getUser();
    }

    public function getAthletesPagination($page, $per_page)
    {
        $athletes_repo = $this->em->getRepository('Core:Athlete');
        $qb = $athletes_repo->createQueryBuilder("athlete");
        $qb->select("athlete");
        $pageParam = "athletesPage";
    return $this->getPaginationData($qb, $page, $per_page, $pageParam);
    }

    public function getPaginationData($qb, $page, $per_page, $pageParam)
    {
        $paginator  = $this->container->get('knp_paginator');
        $q = $qb->getQuery(); //->getArrayResult();
        $entity_collection = $paginator->paginate($q,  $page, $per_page, array('pageParameterName'=>$pageParam));
        $pagination = $entity_collection->getPaginationData();
        $collection = array();
        $ids = array();
        foreach($entity_collection as $e){
            $collection[] = $e->serializeArray(); // Entity should implement serializeArray()
            $ids[] = $e->getId();
        }
        $pagination['ids'] = $ids;
        $pagination['pageParameterName'] = $pageParam;
    return array($collection, $pagination);
    }

    public function getChartData()
    {
        return 
            [ 'id' => 'main',
              'title' => htmlentities("Todays chart", ENT_QUOTES),
              'columns' => ['Timestamp', 'Previous', 'Current'],
              'data' => [
                ['2017-03-01T01:00:00', 1, 3],
                ['2017-03-02T01:00:00', 2, 6],
                ['2017-03-03T01:00:00', 2, 6],
                ['2017-03-04T01:00:00', 2, 6],
                ['2017-03-05T01:00:00', 2, 6],
                ['2017-03-06T01:00:00', 4, 6],
                ['2017-03-07T01:00:00', 9, 7],
                ['2017-03-08T01:00:00', 18, 14],
                ['2017-03-09T01:00:00', 23, 16],
                ['2017-03-10T01:00:00', 24, 16],
                ['2017-03-11T01:00:00', 24, 16],
                ['2017-03-12T01:00:00', 24, 16],
                ['2017-03-13T01:00:00', 25, 18],
                ['2017-03-14T01:00:00', 26, 19],
                ['2017-03-15T01:00:00', 30, 21],
                ['2017-03-16T01:00:00', 32, 23],
                ['2017-03-17T01:00:00', 32, 23],
                ['2017-03-18T01:00:00', 32, 23],
                ['2017-03-19T01:00:00', 32, 23],
                ['2017-03-20T01:00:00', 32, 23],
                ['2017-03-21T01:00:00', 32, 25],
                ['2017-03-22T01:00:00', 32, 26],
                ['2017-03-23T01:00:00', 32, 28],
                ['2017-03-24T01:00:00', 32, 29],
                ['2017-03-25T01:00:00', 32, 29],
                ['2017-03-26T01:00:00', 32, 29],
                ['2017-03-27T01:00:00', 32, 29],
                ['2017-03-28T01:00:00', 35, 29],
                ['2017-03-29T01:00:00', 35, 29],
                ['2017-03-30T01:00:00', 35, null],
                ['2017-03-31T01:00:00', 35, null]
            ]
          ];
    }

}
