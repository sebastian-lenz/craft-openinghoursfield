<?php

namespace lenz\openinghoursfield\models;

use craft\base\Model;
use craft\helpers\ArrayHelper;
use Exception;
use lenz\openinghoursfield\models\validities\AlwaysValidity;
use lenz\openinghoursfield\models\validities\DatesValidity;
use lenz\openinghoursfield\models\validities\MonthsValidity;
use lenz\openinghoursfield\models\validities\RangesValidity;

/**
 * Class Validity
 */
abstract class Validity extends Model
{
  /**
   * @var string[]
   */
  static array $TYPES = [
    'always' => AlwaysValidity::class,
    'dates' => DatesValidity::class,
    'months' => MonthsValidity::class,
    'ranges' => RangesValidity::class,
  ];


  /**
   * @return string
   */
  abstract public function getJsCondition(): string;

  /**
   * @return bool
   */
  abstract public function isNever(): bool;

  /**
   * @return array
   */
  abstract public function toJson(): array;

  /**
   * @param array $timeSpec
   * @return array
   */
  abstract public function toLinkingData(array $timeSpec): array;


  // Static methods
  // --------------

  /**
   * @param array $data
   * @return Validity
   * @throws Exception
   */
  static public function create(array $data): Validity {
    $type = ArrayHelper::getValue($data, 'type');
    if (!array_key_exists($type, self::$TYPES)) {
      throw new Exception('Invalid Validity type: ' . $type);
    }

    $validityClass = self::$TYPES[$type];
    unset($data['type']);
    return new $validityClass($data);
  }
}
