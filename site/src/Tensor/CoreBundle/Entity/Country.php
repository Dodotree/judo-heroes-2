<?php

namespace Tensor\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Constraint;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;


/**
 * Country
 *
 * @ORM\Table(name="countries")
 * @ORM\Entity(repositoryClass="Tensor\CoreBundle\Entity\CountryRepository")
 * @ORM\MappedSuperclass
 * @ORM\HasLifecycleCallbacks
 * @UniqueEntity(fields="id", message="Id already taken")
 * @UniqueEntity(fields="name", message="Name already taken")
 */
class Country
{
    /**
     * @var integer
     * @ORM\Column(name="id", type="string", length=5)
     * @ORM\Id
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=250, unique=false)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=250, unique=false)
     */
    private $icon;

    /**
     * @ORM\OneToMany(targetEntity="Athlete", mappedBy="country", indexBy="id")
     */
    protected $athletes;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->athletes = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function serializeArray()
    {
        return array(
            'id' => $this->id,
            'name' => $this->name,
            'icon' => $this->icon,
        );
    }

    /**
     * Set id.
     *
     * @param string $id
     *
     * @return Country
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get id.
     *
     * @return string
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
     * @return Country
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
     * Set icon.
     *
     * @param string $icon
     *
     * @return Country
     */
    public function setIcon($icon)
    {
        $this->icon = $icon;

        return $this;
    }

    /**
     * Get icon.
     *
     * @return string
     */
    public function getIcon()
    {
        return $this->icon;
    }

    /**
     * Add athlete.
     *
     * @param \Tensor\CoreBundle\Entity\Athlete $athlete
     *
     * @return Country
     */
    public function addAthlete(\Tensor\CoreBundle\Entity\Athlete $athlete)
    {
        $this->athletes[] = $athlete;

        return $this;
    }

    /**
     * Remove athlete.
     *
     * @param \Tensor\CoreBundle\Entity\Athlete $athlete
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeAthlete(\Tensor\CoreBundle\Entity\Athlete $athlete)
    {
        return $this->athletes->removeElement($athlete);
    }

    /**
     * Get athletes.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAthletes()
    {
        return $this->athletes;
    }
}
