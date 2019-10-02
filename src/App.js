import React, { Fragment, useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'

document.body.style = 'background-image: url(https://images.unsplash.com/photo-1520034475321-cbe63696469a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9);'

function App() {
  let randomNumber = Math.floor((Math.random() * (60 - 1)) + 1)
  const [hasError, setErrors] = useState(false)
  const [planets, setPlanets] = useState({ planets: [] })
  const [url, setUrl] = useState(
    'https://swapi.co/api/planets/' + randomNumber
  )
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const res = await fetch(url)

      res
        .json()
        .then(res => setPlanets(res))
        .catch(err => setErrors(err))
      
      setIsLoading(false)
    }
    fetchData()
  },[url])

  return (
    <Fragment>
      <div className='container p-5'>
        <div className='row'>
          <div className='col-sm-6 mx-auto'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>
                  Star Wars - Planet
                </h5>

                {hasError && 
                  <h6 className='card-subtitle mb-1 text-muted'>
                    Has error: {JSON.stringify(hasError)}
                  </h6>
                }

                {isLoading ? (
                  <h6 className='card-subtitle mb-1 text-muted'>Loading ...</h6>
                ) : (
                  <>
                    <h6 className='card-subtitle mb-1 text-muted'>
                      Name: {planets.name}
                    </h6>
                    <p className='card-text mb-0'>
                      Population:&nbsp;
                      {planets.population !== 'unknown' ? 
                        (<NumberFormat
                          value={planets.population}
                          displayType={'text'}
                          thousandSeparator={true}
                        />) : (planets.population)
                      }
                    </p>
                    <p className='card-text mb-0'>
                      Climate: {planets.climate}
                    </p>
                    <p className='card-text mb-2'>
                      Terrain: {planets.terrain}
                    </p>
                    <p className='card-text'>
                      Featured in Films
                    </p>
                  </>
                )}
              </div>
            </div>
            <button
              type='button'
              className='btn btn-warning btn-lg btn-block' 
              onClick={() =>
                setUrl('https://swapi.co/api/planets/' + randomNumber)
              }
            >
              Other Planet
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App
