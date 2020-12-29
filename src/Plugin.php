<?php

namespace lenz\openinghoursfield;

use craft\events\RegisterComponentTypesEvent;
use craft\services\Fields;
use lenz\openinghoursfield\fields\OpeningHoursField;
use yii\base\Event;

/**
 * Class Plugin
 */
class Plugin extends \craft\base\Plugin
{
  /**
   * Plugin constructor.
   *
   * @param $id
   * @param null $parent
   * @param array $config
   */
  public function __construct($id, $parent = null, array $config = []) {
    parent::__construct($id, $parent, $config);

    Event::on(Fields::class, Fields::EVENT_REGISTER_FIELD_TYPES, function(RegisterComponentTypesEvent $event) {
      $event->types[] = OpeningHoursField::class;
    });
  }
}
