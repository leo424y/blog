import React from 'react';
import s from './index.scss';
import { Link } from 'react-router-dom';

class IndexPage extends React.Component {
	constructor(){
		super();
		this.state = {
      chinese: true,
      introduce: {
        welcome: '朋友，你好！',
        name: '我是張揚翔',
        work: '目前在台灣任工程師',
        more: '更多關於我的資訊，請見下方。',
        blog: '部落格'
      }
		};

		this.getLanguage = this.getLanguage.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.gotoUrl = this.gotoUrl.bind(this);
	}

	componentDidMount(){
    this.getLanguage();
	}

	getLanguage(){
	  if(!(/zh/.test(navigator.language))){
      this.changeLanguage({}, false)
    }
  }

  changeLanguage(e, chinese){
	  e.stopPropagation && e.stopPropagation();
	  if(chinese){
      this.setState({
        chinese: chinese,
        introduce: {
          welcome: '朋友，你好！',
          name: '我是張揚翔，',
          work: '目前在台灣從事開發工作，',
          more: '更多關於我的資訊，請見下方。',
          blog: '部落格'
        }
      })
    }else {
      this.setState({
        chinese: chinese,
        introduce: {
          welcome: 'Hi Friend,',
          name: 'I’m Fly Chang.',
          work: 'A Web Developer in Shanghai.',
          more: 'More about me at the bottom.',
          blog: 'Blog'
        }
      })
    }
  }


  gotoUrl(){
	  this.props.history.push('/blog')
  }


	render() {
		return (
			<div className={s.container}>
				<div className={s.photo} onClick={this.gotoUrl}>
          <Link className={s.blogBtn} to='/blog'>{this.state.introduce.blog}</Link>
          <button className={s.languageBtn} onClick={(e) => this.changeLanguage(e, !this.state.chinese)}>中 / EN</button>
        </div>
				<p className={`${s.slogan} ${this.state.chinese && s.chineseSlogan}`}></p>
				<div className={s.about}>
          <div className={s.introduce}>
            <p className={s.welcome}>{this.state.introduce.welcome}</p>
            <div>
              {this.state.introduce.name}<br/>{this.state.introduce.work}<br/>{this.state.introduce.more}
            </div>
          </div>
          <div className={s.link}>
            <div className={s.icon_link}>
              <a href="https://github.com/leo424y" target="_blank">
                <i className={`iconfont ${s.icon_github}`}>&#xe600;</i>
              </a>
            </div>
            <div className={s.word_link}>
              <Link to='/blog'>Blog</Link>
            </div>
          </div>
				</div>
			</div>
		);
	}
}

export default IndexPage;
