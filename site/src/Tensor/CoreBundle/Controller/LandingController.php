<?php
namespace Tensor\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Tensor\CoreBundle\Entity\Athlete;
use Tensor\CoreBundle\Entity\Medal;
use Tensor\CoreBundle\Entity\Country;

class LandingController extends Controller
{
    public function landingAction($_subpage='', $_athlete='', Request $request){

        $page = ($_subpage != '') ? $_subpage : 1;
        $per_page = 3;
        list($athletes, $pagination) = $this->get('api_functions')->getAthletesPagination($page, $per_page);  

        $route_name = $request->attributes->get('_route');
        if(("tensor_core_home" == $route_name or "tensor_core_home_expanded" == $route_name) and $_subpage != ''){
            $user = $this->getUser();

            return $this->render('@TensorCore/vue_layout.html.twig', [
                'preload'=> [
                    'athletes' => $athletes,
                    'pagination' => $pagination,
                    'loggedUser' => ['user' => ['id' => $user->getId(), 'username' => $user->getUsername()]],
                ]
            ]);
        }

        ///return $this->json(array('page'=>'landing'));
        return $this->render('@TensorCore/index.html.twig', ['preload'=> json_encode($athletes)]);
    }
 
}
