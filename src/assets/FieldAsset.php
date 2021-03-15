<?php

namespace lenz\openinghoursfield\assets;

use craft\web\AssetBundle;
use craft\web\assets\datepickeri18n\DatepickerI18nAsset;
use craft\web\assets\timepicker\TimepickerAsset;
use craft\web\View;

/**
 * Class FieldAsset
 */
class FieldAsset extends AssetBundle
{
  /**
   * @inheritdoc
   */
  public function init() {
    $this->depends = [
      TimepickerAsset::class,
      DatepickerI18nAsset::class,
    ];

    $this->sourcePath = __DIR__ . '/resources';
    $this->css = ['opening-hours.css'];
    $this->js = ['opening-hours.js'];
    $this->jsOptions  = [
    ];

    parent::init();
  }

  /**
   * @inheritdoc
   */
  public function registerAssetFiles($view) {
    parent::registerAssetFiles($view);

    if ($view instanceof View) {
      $view->registerTranslations('openinghoursfield', [
        'Activate',
        'Add date',
        'Add specification',
        'Add time slot',
        'Always',
        'At certain dates',
        'Between certain dates',
        'Closed',
        'Dates',
        'Deactivate',
        'Deactivated',
        'In certain months',
        'In the months',
        'Never',
        'On the weekdays',
        'Opened',
        'Opening state',
        'Opening times',
        'Remove',
        'Specification',
        'This specification applies',
      ]);
    }
  }
}
