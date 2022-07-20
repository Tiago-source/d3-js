import React, {useEffect, useRef} from 'react';
import * as d3 from "d3";

export default function LineGraph(props){
    const margin = { top: 30, right: 30, bottom: 30, left: 30 }
    const width = 600
    const height = 300
    const data = props.data

    const d3svg = useRef(null);

    useEffect(() => {
        if (data && d3svg.current) {
            let svg = d3.select(d3svg.current);

            const yScale = d3.scaleLinear()
                .domain(d3.extent(data.map(d => d.count)))
                .range([height, 0])
                .nice();
            const xScale = d3.scaleLinear()
                .domain([data[0].year, data[data.length -1].year])
                .range([0, width])
                .nice();

            svg = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

            // draw header
            svg
                .append('g')
                .attr('class', 'bar-header')
                .attr('transform', `translate(0, ${-margin.top / 2})`)
                .append('text')
                .append('tspan')
                .text('Line chart')

            // draw axes
            const xAxis = d3.axisBottom(xScale)
            svg
                .append('g')
                .attr('class', 'x axis')
                .attr('transform', `translate(0,${height})`)
                .call(xAxis)
            const yAxis = d3.axisLeft(yScale).tickSize(0)
            svg
                .append('g')
                .attr('class', 'y axis')
                .call(yAxis)

            svg.selectAll("line")
                .data(data)
                .append("path")
                .enter()
                .attr('class', 'line')
                .attr("fill", "none")
                .attr("stroke", 'blue')
                .attr("stroke-width", 1.5)
                .attr("class", "line")
                .attr("d", d3.line()
                  .x(d => xScale(d.year))
                  .y(d => yScale(d.count))
                );  

                svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "blue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.count)));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

  if (data === null) {
    return <p>Loading...</p>
  } else
  return (
    <div className='graphContainer'>
        <svg
        className="line-chart-container"
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
        role="img"
        ref={d3svg}
        ></svg>
    </div>
  )
}