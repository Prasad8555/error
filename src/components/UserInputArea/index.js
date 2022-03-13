import {Component} from 'react'
import {ThreeDots} from 'react-loader-spinner'
import {v4} from 'uuid'
import './index.css'

const requestStatusConstant = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserInputArea extends Component {
  state = {
    planets: [],
    vehicles: [],
    token: '',
    planetOne: '',
    planetTwo: '',
    planetThree: '',
    planetFour: '',
    vehicleOne: '',
    vehicleTwo: '',
    vehicleThree: '',
    vehicleFour: '',
    requestStatus: 'LOADING',
  }

  componentDidMount = () => {
    this.getPlanetsAndVehiclesAndToken()
  }

  getUpdatedVehicles = vehicles => {
    const updatedVehicles = vehicles.map(eachVehicle => ({
      name: eachVehicle.name,
      totalNo: eachVehicle.total_no,
      maxDistance: eachVehicle.max_distance,
      speed: eachVehicle.speed,
    }))
    return updatedVehicles
  }

  getUpdatedPlanets = planets => {
    const updatedPlanets = planets.map(eachPlanet => ({
      name: eachPlanet.name,
      distance: eachPlanet.distance,
      activeId: '',
    }))
    return updatedPlanets
  }

  getPlanetsAndVehiclesAndToken = async () => {
    const planetsUrl = 'https://findfalcone.herokuapp.com/planets'
    const planetsResponse = await fetch(planetsUrl)
    let planets: []
    if (planetsResponse.ok === true) {
      const planetsData = await planetsResponse.json()
      planets = this.getUpdatedPlanets(planetsData)
    }

    const vehiclesUrl = 'https://findfalcone.herokuapp.com/vehicles'
    const vehiclesResponse = await fetch(vehiclesUrl)
    let vehicles = []
    if (vehiclesResponse.ok === true) {
      const vehiclesData = await vehiclesResponse.json()
      vehicles = this.getUpdatedVehicles(vehiclesData)
    }

    const tokenUrl = 'https://findfalcone.herokuapp.com/token'
    const options = {
      headers: {
        Accept: 'application/json',
      },
      method: 'POST',
    }

    const tokenResponse = await fetch(tokenUrl, options)
    let token = ''
    if (tokenResponse.ok === true) {
      token = await tokenResponse.json()
    }
    const allRequestsAreSuccess =
      planetsResponse.ok === true &&
      vehiclesResponse.ok === true &&
      tokenResponse.ok === true
    const requestStatus = allRequestsAreSuccess ? 'SUCCESS' : 'FAILURE'
    this.setState({
      planets,
      vehicles,
      token,
      requestStatus,
    })
  }

  onChangeVehicleFour = event => {
    const {vehicles, vehicleFour} = this.state
    const argumentVehicleName = event.target.value
    const updatedVehicles = vehicles.map(eachVehicle => {
      const vehicleName = eachVehicle.name
      const {totalNo} = eachVehicle
      if (vehicleName === argumentVehicleName) {
        const updatedVehicle = {
          ...eachVehicle,
          totalNo: totalNo - 1,
        }
        return updatedVehicle
      }
      if (vehicleName === vehicleFour) {
        const updatedVehicle = {
          ...eachVehicle,
          totalNo: eachVehicle.totalNo + 1,
        }
        return updatedVehicle
      }
      return eachVehicle
    })
    this.setState({
      vehicles: updatedVehicles,
      vehicleFour: argumentVehicleName,
    })
  }

  onChangePlanetFour = event => {
    const planet = event.target.value
    const {planets, planetFour} = this.state
    const prevPlanet = planetFour
    if (prevPlanet !== '') {
      const updatedPlanets = planets.map(eachPlanet => {
        const planetName = eachPlanet.name
        if (planetName === prevPlanet) {
          const updatedPreviousPlanet = {
            ...eachPlanet,
            activeId: '',
          }
          return updatedPreviousPlanet
        }
        if (planetName === planet) {
          const updatedPresentPlanet = {
            ...eachPlanet,
            activeId: 'planet4',
          }
          return updatedPresentPlanet
        }
        return eachPlanet
      })
      this.setState({
        planets: updatedPlanets,
        planetFour: planet,
      })
    } else {
      const updatedPlanets = planets.map(eachPlanet => {
        const planetName = eachPlanet.name
        if (planetName === planet) {
          const updatedPresentPlanet = {
            ...eachPlanet,
            activeId: 'planet4',
          }
          return updatedPresentPlanet
        }
        return eachPlanet
      })
      this.setState({
        planets: updatedPlanets,
        planetFour: planet,
      })
    }
  }

  onChangeVehicleThree = event => {
    const {vehicles, vehicleThree} = this.state
    const argumentVehicleName = event.target.value
    const updatedVehicles = vehicles.map(eachVehicle => {
      const vehicleName = eachVehicle.name
      const {totalNo} = eachVehicle
      if (vehicleName === argumentVehicleName) {
        const updatedVehicle = {
          ...eachVehicle,
          totalNo: totalNo - 1,
        }
        return updatedVehicle
      }
      if (vehicleName === vehicleThree) {
        const updatedVehicle = {
          ...eachVehicle,
          totalNo: eachVehicle.totalNo + 1,
        }
        return updatedVehicle
      }
      return eachVehicle
    })
    this.setState({
      vehicles: updatedVehicles,
      vehicleThree: argumentVehicleName,
    })
  }

  onChangePlanetThree = event => {
    const planet = event.target.value
    const {planets, planetThree} = this.state
    const prevPlanet = planetThree
    if (prevPlanet !== '') {
      const updatedPlanets = planets.map(eachPlanet => {
        const planetName = eachPlanet.name
        if (planetName === prevPlanet) {
          const updatedPreviousPlanet = {
            ...eachPlanet,
            activeId: '',
          }
          return updatedPreviousPlanet
        }
        if (planetName === planet) {
          const updatedPresentPlanet = {
            ...eachPlanet,
            activeId: 'planet3',
          }
          return updatedPresentPlanet
        }
        return eachPlanet
      })
      this.setState({
        planets: updatedPlanets,
        planetThree: planet,
      })
    } else {
      const updatedPlanets = planets.map(eachPlanet => {
        const planetName = eachPlanet.name
        if (planetName === planet) {
          const updatedPresentPlanet = {
            ...eachPlanet,
            activeId: 'planet3',
          }
          return updatedPresentPlanet
        }
        return eachPlanet
      })
      this.setState({
        planets: updatedPlanets,
        planetThree: planet,
      })
    }
  }

  onChangeVehicleTwo = event => {
    const {vehicles, vehicleTwo} = this.state
    const argumentVehicleName = event.target.value
    const updatedVehicles = vehicles.map(eachVehicle => {
      const vehicleName = eachVehicle.name
      const {totalNo} = eachVehicle
      if (vehicleName === argumentVehicleName) {
        const updatedVehicle = {
          ...eachVehicle,
          totalNo: totalNo - 1,
        }
        return updatedVehicle
      }
      if (vehicleName === vehicleTwo) {
        const updatedVehicle = {
          ...eachVehicle,
          totalNo: eachVehicle.totalNo + 1,
        }
        return updatedVehicle
      }
      return eachVehicle
    })
    this.setState({
      vehicles: updatedVehicles,
      vehicleTwo: argumentVehicleName,
    })
  }

  onChangePlanetTwo = event => {
    const planet = event.target.value
    const {planets, planetTwo} = this.state
    const prevPlanet = planetTwo
    if (prevPlanet !== '') {
      const updatedPlanets = planets.map(eachPlanet => {
        const planetName = eachPlanet.name
        if (planetName === prevPlanet) {
          const updatedPreviousPlanet = {
            ...eachPlanet,
            activeId: '',
          }
          return updatedPreviousPlanet
        }
        if (planetName === planet) {
          const updatedPresentPlanet = {
            ...eachPlanet,
            activeId: 'planet2',
          }
          return updatedPresentPlanet
        }
        return eachPlanet
      })
      this.setState({
        planets: updatedPlanets,
        planetTwo: planet,
      })
    } else {
      const updatedPlanets = planets.map(eachPlanet => {
        const planetName = eachPlanet.name
        if (planetName === planet) {
          const updatedPresentPlanet = {
            ...eachPlanet,
            activeId: 'planet2',
          }
          return updatedPresentPlanet
        }
        return eachPlanet
      })
      this.setState({
        planets: updatedPlanets,
        planetTwo: planet,
      })
    }
  }

  onChangeVehicleOne = event => {
    const {vehicles, vehicleOne} = this.state
    const argumentVehicleName = event.target.value
    const updatedVehicles = vehicles.map(eachVehicle => {
      const vehicleName = eachVehicle.name
      const {totalNo} = eachVehicle
      if (vehicleName === argumentVehicleName) {
        const updatedVehicle = {
          ...eachVehicle,
          totalNo: totalNo - 1,
        }
        return updatedVehicle
      }
      if (vehicleName === vehicleOne) {
        const updatedVehicle = {
          ...eachVehicle,
          totalNo: eachVehicle.totalNo + 1,
        }
        return updatedVehicle
      }
      return eachVehicle
    })
    this.setState({
      vehicles: updatedVehicles,
      vehicleOne: argumentVehicleName,
    })
  }

  onChangePlanetOne = event => {
    const planet = event.target.value
    const {planets, planetOne} = this.state
    const prevPlanet = planetOne
    if (prevPlanet !== '') {
      const updatedPlanets = planets.map(eachPlanet => {
        const planetName = eachPlanet.name
        if (planetName === prevPlanet) {
          const updatedPreviousPlanet = {
            ...eachPlanet,
            activeId: '',
          }
          return updatedPreviousPlanet
        }
        if (planetName === planet) {
          const updatedPresentPlanet = {
            ...eachPlanet,
            activeId: 'planet1',
          }
          return updatedPresentPlanet
        }
        return eachPlanet
      })
      this.setState({
        planets: updatedPlanets,
        planetOne: planet,
      })
    } else {
      const updatedPlanets = planets.map(eachPlanet => {
        const planetName = eachPlanet.name
        if (planetName === planet) {
          const updatedPresentPlanet = {
            ...eachPlanet,
            activeId: 'planet1',
          }
          return updatedPresentPlanet
        }
        return eachPlanet
      })
      this.setState({
        planets: updatedPlanets,
        planetOne: planet,
      })
    }
  }

  getPlanetData = planetName => {
    const {planets} = this.state
    const planetData = planets.filter(
      eachPlanet => eachPlanet.name === planetName,
    )
    const [planet] = planetData
    return planet
  }

  renderSuccessView = () => {
    const {
      planets,
      vehicles,
      token,
      planetOne,
      planetTwo,
      planetThree,
      planetFour,
    } = this.state
    const planetOneData = planetOne !== '' && this.getPlanetData(planetOne)
    const planetTwoData = planetTwo !== '' && this.getPlanetData(planetTwo)
    const planetThreeData =
      planetThree !== '' && this.getPlanetData(planetThree)
    const planetFourData = planetFour !== '' && this.getPlanetData(planetFour)

    return (
      <>
        <form>
          <h1>Select planets you want to search in:</h1>
          <div>
            <div>
              <label htmlFor="destinationOne">Destination 1</label>
              <select
                id="destinationOne"
                value={planetOne}
                onChange={this.onChangePlanetOne}
              >
                <option disabled className="select-option" value="">
                  Select
                </option>
                {planets.map(
                  eachPlanet =>
                    (eachPlanet.activeId === '' ||
                      eachPlanet.activeId === 'planet1') && (
                      <option key={v4()}>{eachPlanet.name}</option>
                    ),
                )}
              </select>
              {planetOne !== '' && (
                <ul>
                  {vehicles.map(eachVehicle => {
                    const vehicleName = eachVehicle.name
                    const distance = eachVehicle.maxDistance
                    const vehicleIndex = vehicles.indexOf(eachVehicle)
                    const id = `vehicle${vehicleIndex}`
                    console.log(eachVehicle.totalNo, distance, id)
                    if (
                      eachVehicle.totalNo > 0 &&
                      planetOneData.distance <= distance
                    ) {
                      return (
                        <li key={id}>
                          <input
                            type="radio"
                            id={id}
                            name="planet1"
                            value={vehicleName}
                            onChange={this.onChangeVehicleOne}
                          />
                          <label htmlFor={id}>{vehicleName}</label>
                        </li>
                      )
                    }
                    return (
                      <li key={id}>
                        <input type="radio" name="planet1" id={id} disabled />
                        <label htmlFor={id}>{vehicleName}</label>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
            <div>
              <label htmlFor="destinationTwo">Destination 2</label>
              <select
                id="destinationTwo"
                value={planetTwo}
                onChange={this.onChangePlanetTwo}
              >
                <option disabled className="select-option" value="">
                  Select
                </option>
                {planets.map(
                  eachPlanet =>
                    (eachPlanet.activeId === '' ||
                      eachPlanet.activeId === 'planet2') && (
                      <option key={v4()}>{eachPlanet.name}</option>
                    ),
                )}
              </select>
              {planetTwo !== '' && (
                <ul>
                  {vehicles.map(eachVehicle => {
                    const vehicleName = eachVehicle.name
                    const distance = eachVehicle.maxDistance
                    const vehicleIndex = vehicles.indexOf(eachVehicle)
                    const id = `vehicle${vehicleIndex + 10}`
                    console.log(eachVehicle.totalNo, distance, id)
                    if (
                      eachVehicle.totalNo > 0 &&
                      planetTwoData.distance <= distance
                    ) {
                      return (
                        <li key={id}>
                          <input
                            type="radio"
                            id={id}
                            name="planet2"
                            value={vehicleName}
                            onChange={this.onChangeVehicleTwo}
                          />
                          <label htmlFor={id}>{vehicleName}</label>
                        </li>
                      )
                    }
                    return (
                      <li key={id}>
                        <input type="radio" name="planet2" id={id} disabled />
                        <label htmlFor={id}>{vehicleName}</label>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
            <div>
              <label htmlFor="destinationThree">Destination 3</label>
              <select
                id="destinationThree"
                value={planetThree}
                onChange={this.onChangePlanetThree}
              >
                <option disabled className="select-option" value="">
                  Select
                </option>
                {planets.map(
                  eachPlanet =>
                    (eachPlanet.activeId === '' ||
                      eachPlanet.activeId === 'planet3') && (
                      <option key={v4()}>{eachPlanet.name}</option>
                    ),
                )}
              </select>
              {planetThree !== '' && (
                <ul>
                  {vehicles.map(eachVehicle => {
                    const vehicleName = eachVehicle.name
                    const distance = eachVehicle.maxDistance
                    const vehicleIndex = vehicles.indexOf(eachVehicle)
                    const id = `vehicle${vehicleIndex + 20}`
                    console.log(eachVehicle.totalNo, distance, id)
                    if (
                      eachVehicle.totalNo > 0 &&
                      planetThreeData.distance <= distance
                    ) {
                      return (
                        <li key={id}>
                          <input
                            type="radio"
                            id={id}
                            name="planet4"
                            value={vehicleName}
                            onChange={this.onChangeVehicleThree}
                          />
                          <label htmlFor={id}>{vehicleName}</label>
                        </li>
                      )
                    }
                    return (
                      <li key={id}>
                        <input type="radio" name="planet4" id={id} disabled />
                        <label htmlFor={id}>{vehicleName}</label>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
            <div>
              <label htmlFor="destinationFour">Destination 4</label>
              <select
                id="destinationFour"
                value={planetFour}
                onChange={this.onChangePlanetFour}
              >
                <option disabled className="select-option" value="">
                  Select
                </option>
                {planets.map(
                  eachPlanet =>
                    (eachPlanet.activeId === '' ||
                      eachPlanet.activeId === 'planet4') && (
                      <option key={v4()}>{eachPlanet.name}</option>
                    ),
                )}
              </select>
              {planetFour !== '' && (
                <ul>
                  {vehicles.map(eachVehicle => {
                    const vehicleName = eachVehicle.name
                    const distance = eachVehicle.maxDistance
                    const vehicleIndex = vehicles.indexOf(eachVehicle)
                    const id = `vehicle${vehicleIndex + 30}`
                    console.log(eachVehicle.totalNo, distance, id)
                    if (
                      eachVehicle.totalNo > 0 &&
                      planetFourData.distance <= distance
                    ) {
                      return (
                        <li key={id}>
                          <input
                            type="radio"
                            id={id}
                            name="planet4"
                            value={vehicleName}
                            onChange={this.onChangeVehicleFour}
                          />
                          <label htmlFor={id}>{vehicleName}</label>
                        </li>
                      )
                    }
                    return (
                      <li key={id}>
                        <input type="radio" name="planet4" id={id} disabled />
                        <label htmlFor={id}>{vehicleName}</label>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        </form>
      </>
    )
  }

  renderLoadingView = () => (
    <div>
      <ThreeDots className="loader" height={50} width={50} color="#4f46e5" />
    </div>
  )

  renderContent = () => {
    const {requestStatus} = this.state
    switch (requestStatus) {
      case requestStatusConstant.loading:
        return this.renderLoadingView()
      case requestStatusConstant.success:
        return this.renderSuccessView()
      case requestStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default UserInputArea
