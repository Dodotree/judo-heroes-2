<?php

namespace Tensor\UserBundle\Listener;

use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\HttpKernel;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class RedirectListener
{
    private $tokenStorage;

    public function __construct(TokenStorageInterface $t)
    {
        $this->tokenStorage = $t;
    }

    public function onKernelRequest(GetResponseEvent $event)
    {
        if (!$event->isMasterRequest()) {
            // don't do anything if it's not the master request
            return;
        }
        $event->setResponse(new JsonResponse(array('error'=>'Login required')));
        // ...
    }
}
