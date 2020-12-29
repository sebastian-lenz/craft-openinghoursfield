function pick<T extends Option = Option>(
  select: HTMLSelectElement,
  options: Array<T>
): T {
  const selected = select.selectedOptions;
  for (let index = 0; index < selected.length; index++) {
    const value = selected[index].value;
    const option = options.find((option) => option.value === value);
    if (option) {
      return option;
    }
  }

  return options[0];
}

export interface Option {
  label: string | { (): string };
  value: string;
}

export interface Props<T extends Option = Option> {
  onChange: (value: T) => void;
  options: Array<T>;
  value: string;
}

export default function Select<T extends Option = Option>({
  onChange,
  options,
  value,
}: Props<T>) {
  return (
    <div className="select">
      <select
        onChange={(event) => onChange(pick(event.currentTarget, options))}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {typeof option.label === 'string' ? option.label : option.label()}
          </option>
        ))}
      </select>
    </div>
  );
}
