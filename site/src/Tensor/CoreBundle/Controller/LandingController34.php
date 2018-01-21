<?php
namespace Tensor\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class LandingController extends Controller
{
    public function landingAction(Request $request){
        ///return $this->json(array('page'=>'landing'));
        return $this->render('@TensorCore/index.html.twig', []);
    }



}
