import React from 'react';
import s from './index.scss';
import Actions from 'actions';
import { Link, browserHistory } from 'react-router-dom';
import Header from 'components/Header';
import PostList from 'components/PostList';

import utils from '../../../tools/utils';

class IndexPage extends React.Component {
  constructor(){
    super();
    this.state = {
      labels: [],
      list: [],
      currentLabel: 'New',
      opacity: 1,
      headerFixed: false
    };

    this.localState = {
      startX: 0,
      startY: 0,
      startT: 0,
      isMove: false,
      isTouchEnd: true,
      initTab: 0,
      currentTab: 0,
      direction: 'left'
    };

    this.chooseLabel = this.chooseLabel.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.handleLabelIndex = this.handleLabelIndex.bind(this);
    this.handleOpacity = this.handleOpacity.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  componentDidMount(){
    document.title = '個人部落格 - 張揚翔 | leo424y';
    window.addEventListener('scroll', this.handleOnScroll);
    let currentLabel = this.props.match.params.type;
    this.getIssues(currentLabel || 'New');
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  getIssues(label = 'New', page = null){
    let data = {};
    this.localState.initLabel = label;
    if(label == 'New' || !this.state.labels.includes(label)){
      label = 'New';
      data = {
        query: `query {
          repository(owner:"leo424y", name: "blog") {
            issues(orderBy:{field: UPDATED_AT, direction: DESC} , labels: null, first: 10, after: ${page}) {
              edges{
                cursor
                node{
                  title
                  updatedAt
                  bodyText
                  number
                }
              }
            }
            labels(first: 100){
              nodes{
                name
              }
            }
          }
        }`
      };
    }else {
      data = {
        query: `query {
        repository(owner:"leo424y", name: "blog") {
          issues(orderBy:{field: UPDATED_AT, direction: DESC} , labels: "${label}", first: 10, after: ${page}) {
            edges{
              cursor
              node{
                title
                updatedAt
                bodyText
                number
              }
            }
          }
          labels(first: 100){
            nodes{
              name
            }
          }
        }
      }`
      };
    }

    Actions.getIssues(data).then((res) => {
      let labels = res.data.data.repository.labels.nodes.map((item, index) => {
        return item.name
      });

      labels.unshift('New');

      let list = res.data.data.repository.issues.edges;
      page = list[(list.length - 1)].cursor;

      this.setState({
        labels: labels,
        list: list,
        currentLabel: label,
        opacity: 1
      })

    })
  }

  _renderLabels(){
    return this.state.labels.map((item, index) => {
      return <li key={item} onClick={() => this.chooseLabel(item)}>
        <div className={item == this.state.currentLabel ? s.current : ''}>
          <p>{item}</p>
        </div>
      </li>
    })
  }

  chooseLabel(currentLabel){
    this.props.history.push(`/blog/${currentLabel}`);
    this.getIssues(currentLabel);
  }

  touchStart(e){
    // e.preventDefault();
    if(e.touches.length == 1 || this.localState.isTouchEnd){
      let touch = e.touches[0];
      this.localState.startX = touch.pageX;
      this.localState.startY = touch.pageY;
      this.localState.initTab = this.state.currentTab;   //本次滑動前的初始位置
      this.localState.startT = new Date().getTime(); //記錄手指按下的開始時間
      this.localState.isMove = false; //是否產生滑動
      this.localState.isTouchEnd = false; //當前開始滑動
    }
  }

  touchMove(e){
    // e.preventDefault();
    let touch = e.touches[0];
    let deltaX = touch.pageX - this.localState.startX;
    let deltaY = touch.pageY - this.localState.startY;
    //如果X方向上的位移大於Y方向，則認為是左右滑動
    if (Math.abs(deltaX) > Math.abs(deltaY)){
      if ((this.handleLabelIndex(this.state.currentLabel) > 0 && deltaX > 0) || (this.handleLabelIndex(this.state.currentLabel) <= (this.state.labels.length - 2) && deltaX < 0)){
        //移動頁面
        this.handleOpacity(0.2);
        this.localState.isMove = true;
      }
      this.localState.direction = deltaX > 0 ? "right" : "left"; //判斷手指滑動的方向
    }
  }

  touchEnd(e){
    // e.preventDefault();
    //計算手指在螢幕上停留的時間
    let deltaT = new Date().getTime() - this.localState.startT;
    let index = 0;
    if (this.localState.isMove){ //發生了左右滑動
      //使用動畫過渡讓頁面滑動到最終的位置
      if(deltaT < 300){ //如果停留時間小於300ms,則認為是快速滑動，無論滑動距離是多少，都停留到下一頁
        index = this.localState.direction == 'left'? 1 : -1;

      }else {
        //如果滑動距離小於螢幕的50%，則退回到上一頁
        if (Math.abs(this.localState.moveLength)/this.localState.pageWidth < 0.5){
          translate = this.localState.currentPosition-this.localState.moveLength;

          index = 0

        }else{
          //如果滑動距離大於螢幕的50%，則滑動到下一頁
          index = this.localState.direction == 'left'? 1 : -1;
        }
      }

      this.chooseLabel(this.state.labels[this.handleLabelIndex(this.state.currentLabel) + index]);

    }
  }

  handleOpacity(opacity){
    this.setState({
      opacity: opacity
    })
  }

  handleLabelIndex(label){
    return this.state.labels.indexOf(label)
  }

  handleOnScroll(){
    let scrollY =  window.scrollY;
    if(scrollY > 50){
      this.setState({
        headerFixed: true
      })
    }else {
      this.setState({
        headerFixed: false
      })
    }
  }

  render() {
    return (
        <div className={s.container}>
          <Header />
          <div className={`${s.box} ${this.state.headerFixed ? s.headerFixed : ''}`} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
            <ul className={s.labels}>
              {this._renderLabels()}
            </ul>
            <div className={s.list} style={{opacity: this.state.opacity}} >
              <PostList list={this.state.list} />
            </div>
          </div>
        </div>
    );
  }
}

export default IndexPage;
