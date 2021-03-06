<?php

namespace Tensor\UserBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Tensor\UserBundle\Entity\User;

class SecurityController extends Controller
{

    public function loginAction(Request $request)
    {
        if ($this->getUser() instanceof User) {
            // return $this->redirect('/');
            return $this->redirectToRoute('tensor_core_home', array('_page'=>'private'));
        }

        $authenticationUtils = $this->get('security.authentication_utils');

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('@TensorUser/Security/login.html.twig', array(
            'last_username' => $lastUsername,
            'error'         => $error,
            'preload'       => [],
        ));
    }


    public function apiloginAction(Request $request)
    {
        $user = $this->getUser();
    return $this->json(['successes'=> ['loggedUser' => ['user' => ['id' => $user->getId(), 'username' => $user->getUsername()]]]]);
    }
}
