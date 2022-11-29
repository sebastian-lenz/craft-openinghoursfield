<?php

namespace lenz\openinghoursfield\models;

use craft\base\Model;
use Exception;
use lenz\craft\utils\validators\ModelArrayValidator;
use lenz\craft\utils\validators\ModelValidator;
use lenz\openinghoursfield\helpers\DateHelpers;

/**
 * Class Specification
 *
 * @property TimeRange[] $timeRanges
 * @property Validity $validity
 */
class Specification extends Model
{
  /**
   * @var bool
   */
  public bool $enabled = true;

  /**
   * @var string
   */
  public string $state = 'closed';

  /**
   * @var string
   */
  public string $uid;

  /**
   * @var TimeRange[]
   */
  private array $_timeRanges = [];

  /**
   * @var Validity
   */
  private Validity $_validity;


  /**
   * @return string
   */
  public function getJsCondition(): string {
    $condition = $this->validity->getJsCondition();
    $json = json_encode([
      'state' => $this->state,
      'times' => array_map(function(TimeRange $timeRange) {
        return [
          DateHelpers::formatTime($timeRange->opens),
          DateHelpers::formatTime($timeRange->closes)
        ];
      }, $this->state == 'opened' ? $this->_timeRanges : [])
    ]);

    return "if($condition)return$json;";
  }

  /**
   * @return TimeRange[]
   */
  public function getTimeRanges(): array {
    return $this->_timeRanges;
  }

  /**
   * @return Validity
   * @noinspection PhpUnused (Public API)
   */
  public function getValidity(): Validity {
    return $this->_validity;
  }

  /**
   * @inheritDoc
   */
  public function init(): void {
    parent::init();

    if ($this->state == 'closed') {
      $this->_timeRanges = [];
    } else {
      usort($this->_timeRanges, function(TimeRange $lft, TimeRange $rgt) {
        return $lft->opens == $rgt->opens
          ? $lft->closes - $rgt->closes
          : $lft->opens - $rgt->opens;
      });
    }
  }

  /**
   * @return bool
   */
  public function isNever(): bool {
    return $this->_validity->isNever();
  }

  /**
   * @inheritDoc
   * @noinspection PhpMissingReturnTypeInspection
   */
  public function rules(): array {
    return array_merge(parent::rules(), [
      [['enabled', 'state', 'timeRanges', 'uid', 'validity'], 'required'],
      ['enabled', 'bool'],
      ['state', 'in', 'range' => ['closed', 'opened']],
      ['timeRanges', ModelArrayValidator::class, 'modelClass' => TimeRange::class],
      ['uid', 'string'],
      ['validity', ModelValidator::class, 'modelClass' => Validity::class],
    ]);
  }

  /**
   * @param TimeRange|TimeRange[]|array $value
   * @throws Exception
   */
  public function setTimeRanges(TimeRange|array $value) {
    if (!is_array($value)) {
      $value = [$value];
    }

    $this->_timeRanges = array_map(function($value) {
      return $value instanceof TimeRange ? $value : new TimeRange($value);
    }, $value);
  }

  /**
   * @param Validity|array $value
   * @throws Exception
   */
  public function setValidity(Validity|array $value) {
    if (!($value instanceof Validity)) {
      $value = Validity::create($value);
    }

    $this->_validity = $value;
  }

  /**
   * @return array
   */
  public function toJson(): array {
    return [
      'enabled' => $this->enabled,
      'state' => $this->state,
      'timeRanges' => $this->_timeRanges,
      'uid' => $this->uid,
      'validity' => $this->_validity->toJson(),
    ];
  }

  /**
   * @return array
   */
  public function toLinkingData(): array {
    if ($this->state == 'closed') {
      $timeSpecs = [TimeRange::LD_CLOSED];
    } elseif (count($this->_timeRanges) == 0) {
      $timeSpecs = [TimeRange::LD_ALL_DAY];
    } else {
      $timeSpecs = array_map(function(TimeRange $timeRange) {
        return $timeRange->toLinkingData();
      }, $this->_timeRanges);
    }

    $result = [];
    foreach ($timeSpecs as $timeSpec) {
      $result = array_merge($result, $this->_validity->toLinkingData($timeSpec));
    }

    return $result;
  }
}
