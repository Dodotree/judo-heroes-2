<?php

namespace Tensor\UserBundle\Listener;

use Symfony\Component\Security\Http\SecurityEvents;
use Symfony\Component\Security\Core\AuthenticationEvents;
use Symfony\Component\Security\Core\Event\AuthenticationEvent;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;

use Symfony\Component\HttpFoundation\JsonResponse;

use Tensor\UserBundle\Entity\User;

class ExeptionListener implements EventSubscriberInterface
{


    public function __construct(TokenStorageInterface $token_storage)
    {
        $this->user = ($token_storage->getToken()) ? $token_storage->getToken()->getUser() : null;
    }

    public static function getSubscribedEvents()
    {
        // return the subscribed events, their methods and priorities
        return array(
           KernelEvents::EXCEPTION => array(
               array('processException', 10),
               array('logException', 0),
               array('notifyException', -10),
           )
        );
    }

    public function onKernelException(GetResponseForExceptionEvent $event)
    {
    }

    public function processException(GetResponseForExceptionEvent $event)
    {
        // ...
        if (!$event->isMasterRequest()) {
            // don't do anything if it's not the master request
            return;
        }
        $request = $event->getRequest();
        if( $request->getMethod() === 'POST' ){
            $userArr = ($this->user instanceof User) ?
                ['id' => $this->user->getId(), 'username' => $this->user->getUsername()]
                : 'none';
            $event->setResponse(new JsonResponse(['error'=> [
                'message' => $event->getException()->getMessage(), 
                'loggedUser' => $userArr
            ]], 403));
        }
    }

    public function logException(GetResponseForExceptionEvent $event)
    {
        // ...
    }

    public function notifyException(GetResponseForExceptionEvent $event)
    {
        // ...
    }
}
