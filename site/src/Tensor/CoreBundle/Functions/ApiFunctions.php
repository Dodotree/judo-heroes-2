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

}
