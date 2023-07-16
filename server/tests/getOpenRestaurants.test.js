import assert from 'assert';
import { getOpenRestaurants } from '../getOpenRestaurants.js';

describe('Get Open Restaurants', function () {
  it('Returns correct restaurants for Sunday at 12:15 am', function () {
    const expected = [
      'The Cheesecake Factory',
      'Sudachi',
      'Naan \'N\' Curry',
      'Thai Stick Restaurant',
      'Sabella & La Torre',
      'Marrakech Moroccan Restaurant'
    ]
    
    const openRestaurants = getOpenRestaurants(7, '12:15 am')

    assert.equal(openRestaurants.length, expected.length)

    openRestaurants.forEach(({ name }) => {
      assert(expected.includes(name))
    })
  })

  it('Returns correct restaurants for Sunday at 12:45 am', function () {
    const expected = [
      'Sudachi',
      'Naan \'N\' Curry',
      'Thai Stick Restaurant',
      'Marrakech Moroccan Restaurant'
    ]
    
    const openRestaurants = getOpenRestaurants(7, '12:45 am')

    assert.equal(openRestaurants.length, expected.length)

    openRestaurants.forEach(({ name }) => {
      assert(expected.includes(name))
    })
  })

  it('Returns correct restaurants for Sunday at 1:15 am', function () {
    const expected = [
      'Sudachi',
      'Naan \'N\' Curry',
      'Marrakech Moroccan Restaurant'
    ]
    
    const openRestaurants = getOpenRestaurants(7, '01:15 am')

    assert.equal(openRestaurants.length, expected.length)

    openRestaurants.forEach(({ name }) => {
      assert(expected.includes(name))
    })
  })

  it('Returns correct restaurants for Sunday at 1:30 am', function () {
    const expected = [
      'Naan \'N\' Curry',
      'Marrakech Moroccan Restaurant'
    ]
    
    const openRestaurants = getOpenRestaurants(7, '01:30 am')

    assert.equal(openRestaurants.length, expected.length)

    openRestaurants.forEach(({ name }) => {
      assert(expected.includes(name))
    })
  })

  it('Returns correct restaurants for Monday at 12:15 am', function () {
    const expected = [
      'Naan \'N\' Curry',
      'Thai Stick Restaurant',
      'Marrakech Moroccan Restaurant'
    ]
    
    const openRestaurants = getOpenRestaurants(1, '12:15 am')

    assert.equal(openRestaurants.length, expected.length)

    openRestaurants.forEach(({ name }) => {
      assert(expected.includes(name))
    })
  })
})
