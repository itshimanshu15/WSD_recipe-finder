import React,{Component} from 'react';
import './Home.css';
import {variables} from './Variables.js';

export class Home extends Component{

    constructor(props){
        super(props);

        this.state={
            dish:[],
            DishName:"",
            Category:"",
            Recipe:"",
            PhotoFileName:"anonymous.png",
            PhotoPath:variables.PHOTO_URL,

            DishNameFilter:"",
            dishWithoutFilter:[]
        }
    }

    FilterFn(){
        var DishNameFilter = this.state.DishNameFilter;

        var filteredData=this.state.dishWithoutFilter.filter(
            function(el){
                return el.DishName.toString().toLowerCase().includes(
                    DishNameFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({dish:filteredData});

    }

    changeDishNameFilter = (e)=>{
        this.state.DishNameFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){

        fetch(variables.API_URL+'dish')
        .then(response=>response.json())
        .then(data=>{
            this.setState({dish:data,dishWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    render(){
        const {
            dish,
            PhotoPath,
        }=this.state;
        return(
            <div>
                <input className="searchbar"
                    onChange={this.changeDishNameFilter}
                    placeholder="Search..."/>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                DishName
                            </th>
                            <th>
                                Category
                            </th>
                            <th>
                                Recipe
                            </th>
                            <th>
                                Photo
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dish.map(food=>
                            <tr class="food-content" key={food.DishId}>
                                <td style={{width: 190,}}>{food.DishName}</td>
                                <td style={{width: 220,}}>{food.Category}</td>
                                <td style={{width: 580,}}>{food.Recipe}</td>
                                <td>
                                    <img width="130px" height="130px" alt="food_dish"
                                    src={PhotoPath+food.PhotoFileName}/>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
        )
    }
}