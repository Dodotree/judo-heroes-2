<?php

namespace Tensor\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Medal
 *
 * @ORM\Table(name="medals")
 * @ORM\Entity(repositoryClass="Tensor\CoreBundle\Entity\MedalRepository")
 * @ORM\MappedSuperclass
 * @ORM\HasLifecycleCallbacks
 */
class Medal
{
    /**
     * @var integer
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=250, unique=false)
     */
    private $year;

    /**
     * @ORM\Column(type="string", length=250, unique=false)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=250, unique=false)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=250, unique=false)
     */
    private $event;

    /**
     * @ORM\Column(type="string", length=250, unique=false)
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity="Athlete", inversedBy="medals")
     * @ORM\JoinColumn(name="athlete_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $athlete;


    public function serializeArray()
    {
        return array(
            'id' => $this->id,
            'year' => $this->year,
            'type' => $this->type,
            'city' => $this->city,
            'event' => $this->event,
            'category' => $this->category,
        );
    }

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return Medal
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set year.
     *
     * @param string $year
     *
     * @return Medal
     */
    public function setYear($year)
    {
        $this->year = $year;

        return $this;
    }

    /**
     * Get year.
     *
     * @return string
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * Set type.
     *
     * @param string $type
     *
     * @return Medal
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type.
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set city.
     *
     * @param string $city
     *
     * @return Medal
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city.
     *
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set event.
     *
     * @param string $event
     *
     * @return Medal
     */
    public function setEvent($event)
    {
        $this->event = $event;

        return $this;
    }

    /**
     * Get event.
     *
     * @return string
     */
    public function getEvent()
    {
        return $this->event;
    }

    /**
     * Set category.
     *
     * @param string $category
     *
     * @return Medal
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category.
     *
     * @return string
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set athlete.
     *
     * @param \Tensor\CoreBundle\Entity\Athlete|null $athlete
     *
     * @return Medal
     */
    public function setAthlete(\Tensor\CoreBundle\Entity\Athlete $athlete = null)
    {
        $this->athlete = $athlete;

        return $this;
    }

    /**
     * Get athlete.
     *
     * @return \Tensor\CoreBundle\Entity\Athlete|null
     */
    public function getAthlete()
    {
        return $this->athlete;
    }
}
