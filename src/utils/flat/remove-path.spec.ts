import { removePath } from './remove-path'

describe('removePath', () => {
  let params

  beforeEach(() => {
    params = {
      name: 'value',
      'notPopulated.0': 'val1',
      'notPopulated.1': 'val2',
      'property.0': 'val1',
      'property.1': 'val2',
      'property.2': 'val3',
      'property.3.nested.0': 'val1',
      'property.3.nested.1': 'val2',
      'property.3.nested.2': 'val3',
      'property.3.nested.3.some': 'val3',
      'property.3.nested.4.some-other': 'val41',
      'property.4': 'val4',
      'property.5.nested.0': 'val5',
    }
  })

  it('removes regular property', () => {
    expect(Object.keys(removePath(params, 'name'))).not.toContain('name')
  })

  it('removes element from the array and updates other indexes', () => {
    const newParams = removePath(params, 'property.1')

    expect(newParams).toEqual({
      name: 'value',
      'notPopulated.0': 'val1',
      'notPopulated.1': 'val2',
      'property.0': 'val1',
      'property.1': 'val3',
      'property.2.nested.0': 'val1',
      'property.2.nested.1': 'val2',
      'property.2.nested.2': 'val3',
      'property.2.nested.3.some': 'val3',
      'property.2.nested.4.some-other': 'val41',
      'property.3': 'val4',
      'property.4.nested.0': 'val5',
    })
  })

  it('removes parent element from the array and updates other indexes', () => {
    const newParams = removePath(params, 'property.3.nested.3.some')

    expect(newParams).toEqual({
      name: 'value',
      'notPopulated.0': 'val1',
      'notPopulated.1': 'val2',
      'property.0': 'val1',
      'property.1': 'val2',
      'property.2': 'val3',
      'property.3.nested.0': 'val1',
      'property.3.nested.1': 'val2',
      'property.3.nested.2': 'val3',
      'property.3.nested.3.some-other': 'val41',
      'property.4': 'val4',
      'property.5.nested.0': 'val5',
    })
  })

  it('leaves empty array when removing last element', () => {
    let newParams = removePath(params, 'notPopulated.0')
    newParams = removePath(newParams, 'notPopulated.0')

    expect(newParams).toEqual({
      name: 'value',
      notPopulated: [],
      'property.0': 'val1',
      'property.1': 'val2',
      'property.2': 'val3',
      'property.3.nested.0': 'val1',
      'property.3.nested.1': 'val2',
      'property.3.nested.2': 'val3',
      'property.3.nested.3.some': 'val3',
      'property.3.nested.4.some-other': 'val41',
      'property.4': 'val4',
      'property.5.nested.0': 'val5',
    })
  })
})
