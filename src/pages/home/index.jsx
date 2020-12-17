import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Image } from '@tarojs/components'
import styles from './index.module.scss'
import SearchView from '../../components/lateralview/index'
import searchImg from '../../assets/search.png'
import TQNetwork from '../../kernel/TQNetwork'
import { FIND_LIST } from '../../utils/action'
import RefreshView from '../../components/refresh'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      res: '',
      pageSize: 10,
      pageIndex: 0,
      items: [],//数据
    }
  }

  getItemView() {
    return (
      this.state.items.map((item, index) => {
        return (
          <View className={styles['item']}>
           <Image className={styles['item-img']}></Image>
          </View>
        )
      })
    )

  }

  componentDidMount() {
    this.getFindList()
  }

  getCurrentItem(item) {
    console.log(item.name)
  }


  getFindList() {
    Taro.showLoading({ title: '正在加載', icon: 'none' })
    let params = {
      data: {
      }
    }

    TQNetwork.defaultApi().post(FIND_LIST, params).then(res => {
      if (res.isSuccess) {
        if (res.result.data.length > 0) {
          this.setState({
            items: res.result.data
          })
        }
      }
      Taro.hideLoading()
    }).catch(err => {
      console.log(err)
      Taro.hideLoading()
    })
  }


  //上拉加載
  onPull() {

   
  }

  //下拉刷新
  onDown() {
    this.getFindList()
  }

  render() {
    return (
      <View className={styles['home-page']}>

        <View className={styles['search-view']}>
          <Text className={styles['search-view-current-platform']}>淘宝</Text>
          <Input className={styles['search-view-search']} placeholder={'请输入商品名称'}></Input>
          <Image className={styles['search-view-img']} src={searchImg}></Image>
        </View>
        <SearchView currentTabItem={this.getCurrentItem.bind(this)} />
        <RefreshView refreshHeight={`calc(100vh - 100Px)`} onPull={this.onPull.bind(this)} onDown={this.onDown.bind(this)} items={this.state.items} getItemView={this.getItemView.bind(this)}></RefreshView>
      </View>
    )
  }
}
