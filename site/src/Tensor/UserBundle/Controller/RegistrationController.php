<?php

namespace Tensor\UserBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\AuthenticationEvents;
use Symfony\Component\Security\Core\Event\AuthenticationEvent;
use Symfony\Component\Validator\Constraints as Assert;

use Tensor\UserBundle\Form\UserType;
use Tensor\UserBundle\Entity\User;


class RegistrationController extends Controller
{
    public function registerAction(Request $request)
    {
        if ($this->getUser() instanceof User) {
            return $this->redirectToRoute('tensor_core_home', array('_page'=>'private'));
        }
var_dump($_POST, $_GET, $request->getContent());
        // 1) build the form
        $user = new User();
        $form = $this->createForm(UserType::class, $user);

        // 2) handle the submit (will only happen on POST)
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

            // 3) Encode the password (you could also do this via Doctrine listener)
            $password = $this->get('security.password_encoder')
                ->encodePassword($user, $user->getPlainPassword());
            $user->setPassword($password);

            // 4) set locale
            // $locale = $request->getLocale();
            $locale = 'en';
            $user->setLocale($locale);

            // 5) save the User!
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            return $this->authenticateUser($user);
            #return $this->requestMailConfirmation($em, $user);

        }elseif($form->isSubmitted()){
            return $this->json(array(
                'errors'=>$this->getFieldErrors($form , true),
            ));
        }
    return $this->render(
        '@TensorUser/Registration/registration.html.twig',
        array('form' => $form->createView())
    );
    }

    public function apiregisterAction(Request $request)
    {
    }

    public function getFieldErrors( $form, $top_level_bool ){ #top_level flag for recursion
        $errors = array();
        if( $form instanceof \Symfony\Component\Form\Form ){
            foreach ( $form->getErrors(true,true) as $error ){
                $errors[]=$error->getMessage();
            }
            if( $top_level_bool ){
                $errors = array('global_form' => $errors);
            }
            foreach ($form as $fieldName => $formField) {
                $errors[$fieldName] = self::getFieldErrors( $formField, false );
            }
        }
    return $errors;
    }

    private function authenticateUser($user){
        // somewhat tedios authentication, well, untill we create custom auth provider
        $token = new UsernamePasswordToken($user, null, 'main', $user->getRoles());
        $this->get('security.token_storage')->setToken($token);
        $this->get('session')->set('_security_main', serialize($token));
        $this->get( 'event_dispatcher' )->dispatch(
                                            AuthenticationEvents::AUTHENTICATION_SUCCESS,
                                            new AuthenticationEvent( $token ) );
        return $this->json(array(
            'successes' => array(
                'next' => $this->generateUrl('tensor_user_settings'),
        )));
    }

}
