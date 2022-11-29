<?php

namespace lenz\openinghoursfield\fields;

use Craft;
use craft\base\ElementInterface;
use craft\base\Field;
use craft\helpers\Json;
use lenz\openinghoursfield\models\OpeningHours;
use Throwable;
use yii\db\Schema;

/**
 * Class OpeningHoursField
 */
class OpeningHoursField extends Field
{
  /**
   * @inheritDoc
   */
  public function getInputHtml($value, ElementInterface $element = null): string {
    return $this->render('openinghoursfield/_input', [
      'element' => $element,
      'field' => $this,
      'name' => is_null($this->handle) ? uniqid() : $this->handle,
      'value' => $value,
    ]);
  }

  /**
   * @inheritDoc
   */
  public function normalizeValue(mixed $value, ?ElementInterface $element = null): OpeningHours {
    if ($value instanceof OpeningHours) {
      return $value;
    }

    if (is_array($value)) {
      $attributes = Json::decode($value['model']);
    } elseif (is_string($value)) {
      $attributes = Json::decode($value);
    } else {
      $attributes = [];
    }

    return new OpeningHours($attributes);
  }

  /**
   * @inheritDoc
   */
  public function serializeValue(mixed $value, ?ElementInterface $element = null): string|bool|null {
    return $value instanceof OpeningHours ? json_encode($value->toJson()) : null;
  }


  // Protected methods
  // -----------------

  /**
   * @param string $template
   * @param array $variables
   * @return string
   */
  protected function render(string $template, array $variables) {
    try {
      return Craft::$app->getView()->renderTemplate($template, $variables);
    } catch (Throwable $error) {
      return implode('', [
        '<div class="readable">',
          '<blockquote class="note">',
            '<p><strong>Error while rendering template</strong></p>',
            '<p>', $error->getMessage(), '</p>',
            '<p>In ', $error->getFile(), ' at line ', $error->getLine(), '</p>',
          '</blockquote>',
        '</div>'
      ]);
    }
  }


  // Static methods
  // --------------

  /**
   * @inheritDoc
   */
  public function getContentColumnType(): string {
    return Schema::TYPE_TEXT;
  }

  /**
   * @inheritDoc
   */
  public static function hasContentColumn(): bool {
    return true;
  }

  /**
   * @inheritDoc
   */
  public static function supportedTranslationMethods(): array {
    return [
      self::TRANSLATION_METHOD_NONE,
    ];
  }

  /**
   * @inheritDoc
   */
  public static function valueType(): string {
    return OpeningHours::class;
  }
}
