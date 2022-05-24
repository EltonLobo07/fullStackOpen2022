import React from 'react'

const Header = ({ name }) => <h2>{ name }</h2>

const Part = ({ part }) => <p>{ part.name } { part.exercises }</p>

const Total = ({ total }) => <strong>total of { total } exercises</strong> 

const Content = ({ parts }) => <>{ parts.map(part => <Part key = { part.id } part = { part } />) }</>

const Course = ({ courses }) => {
	return (
		<div>
			<h1>Web development curriculum</h1>

			{ courses.map((course) => {
				return (
					<React.Fragment key = { course.id }>
						<Header name = { course.name } />
						<Content parts = { course.parts } />

						<Total total = { course.parts.reduce((cur_sum, part) => cur_sum + part.exercises , 0) } />
					</React.Fragment>
				)
			}) }

		</div>
	)
}

export default Course