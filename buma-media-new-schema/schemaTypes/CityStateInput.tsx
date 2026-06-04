import {useEffect} from 'react'
import {StringInputProps, set, unset, useFormValue} from 'sanity'

import {getCityStateOptions} from './billboardLocations'

export default function CityStateInput(props: StringInputProps) {
  const {onChange, path, value} = props
  const country = useFormValue([...path.slice(0, -1), 'country']) as string | undefined
  const options = getCityStateOptions(country)
  const hasValidValue = typeof value === 'string' && options.some((option) => option.value === value)

  useEffect(() => {
    if (value && !hasValidValue) {
      onChange(unset())
    }
  }, [hasValidValue, onChange, value])

  return (
    <select
      disabled={!country}
      onChange={(event) => {
        const nextValue = event.currentTarget.value
        onChange(nextValue ? set(nextValue) : unset())
      }}
      value={hasValidValue ? value : ''}
      style={{
        appearance: 'auto',
        background: 'var(--sanity-color-input-default-bg)',
        border: '1px solid var(--sanity-color-input-default-border)',
        borderRadius: '3px',
        boxSizing: 'border-box',
        color: 'var(--sanity-color-input-default-fg)',
        font: 'inherit',
        minHeight: '35px',
        outline: 'none',
        padding: '0 11px',
        width: '100%',
      }}
    >
      <option value="">{country ? 'Select city/state' : 'Select country first'}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  )
}
