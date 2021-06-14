<?php

namespace lenz\openinghoursfield\models;

use craft\base\Model;
use craft\helpers\Template;
use lenz\craft\utils\validators\ModelArrayValidator;
use Twig\Markup;

/**
 * Class OpeningHours
 *
 * @property Specification[] $specifications
 */
class OpeningHours extends Model
{
  /**
   * @var Specification[]
   */
  private $_specifications = [];


  /**
   * @param string $name
   * @return Markup
   * @noinspection PhpUnused (Public API)
   */
  public function getJsFunction(string $name = 'getOpeningHours'): Markup {
    $conditions = array_map(function(Specification $specification) {
      return $specification->getJsCondition();
    }, $this->getSpecificationsByPriority());

    return Template::raw(
      implode('', array_merge([
        'function ', $name, '(v){',
          'v=v instanceof Date?v:new Date();',
          'v.setHours(0);',
          'v.setMinutes(0);',
          'v.setSeconds(0);',
          'v.setMilliseconds(0);',
          ], $conditions, [
          'return{state:"closed",times:[]};',
        '}',
      ]))
    );
  }

  /**
   * @return Specification[]
   * @noinspection PhpUnused (Public API)
   */
  public function getSpecifications(): array {
    return $this->_specifications;
  }

  /**
   * @return Specification[]
   */
  public function getEnabledSpecifications(): array {
    return array_filter($this->_specifications, function(Specification $specifications) {
      return $specifications->enabled;
    });
  }

  /**
   * @return Specification[]
   */
  public function getSpecificationsByPriority(): array {
    return array_reverse($this->getEnabledSpecifications());
  }

  /**
   * @return bool
   */
  public function isEmpty(): bool {
    return count($this->_specifications) == 0;
  }

  /**
   * @return array
   * @noinspection PhpMissingReturnTypeInspection
   */
  public function rules() {
    return array_merge(parent::rules(), [
      ['specifications', 'required'],
      ['specifications', ModelArrayValidator::class, 'modelClass' => Specification::class]
    ]);
  }

  /**
   * @param Specification[] $specifications
   * @noinspection PhpUnused (Public API)
   */
  public function setSpecifications(array $specifications) {
    $this->_specifications = array_map(function($specification) {
      return $specification instanceof Specification
        ? $specification
        : new Specification($specification);
    }, $specifications);
  }

  /**
   * @return array
   */
  public function toJson(): array {
    return [
      'specifications' => array_map(function(Specification $specification) {
        return $specification->toJson();
      }, $this->_specifications),
    ];
  }

  /**
   * @return array
   * @noinspection PhpUnused (Public API)
   */
  public function toLinkingData(): array {
    $result = [];
    foreach ($this->getSpecificationsByPriority() as $specification) {
      if (!$specification->isNever()) {
        $result = array_merge($result, $specification->toLinkingData());
      }
    }

    return $result;
  }
}
