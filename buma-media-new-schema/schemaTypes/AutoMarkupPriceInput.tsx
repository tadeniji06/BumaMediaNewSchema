import {useEffect} from 'react'
import {NumberInputProps, set, unset, useFormValue} from 'sanity'

const MARKUP_MULTIPLIER = 1.3

export default function AutoMarkupPriceInput(props: NumberInputProps) {
  const {onChange, path, value} = props
  const basePrice = useFormValue([...path.slice(0, -1), 'basePrice']) as number | undefined

  const calculatedPrice =
    typeof basePrice === 'number' ? Number((basePrice * MARKUP_MULTIPLIER).toFixed(2)) : undefined

  useEffect(() => {
    if (calculatedPrice === undefined) {
      if (value !== undefined) onChange(unset())
      return
    }

    if (value !== calculatedPrice) {
      onChange(set(calculatedPrice))
    }
  }, [calculatedPrice, onChange, value])

  return props.renderDefault({...props, readOnly: true})
}
