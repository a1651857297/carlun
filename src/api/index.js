
//动态判断域名

const host = /localhost/.test(window.location.host)?'http://baojia.chelun.com':'https://baojia.chelun.com';

function sendRequest(url,method = "GET",data={}){
    let params = {
        method
    };

    //判断  如果是一个post请求，带上请求体信息
    if(method == 'POST'){
        params.body = JSON.stringify(data)
    }

    //判断请求查询 url 是否携带query
    if(url.indexOf('?') == -1){
        url += `?_-${+new Date()}`;
    }else{
        url += `&_-${+new Date()}`;
    }
    
    return fetch(host+url,params)
    .then(res=>res.json())
    .then(body=>body)
}

/**
 * 获取车轮品牌数据
 * @return promise
 */
export let getBrandList = ()=>{
    return sendRequest('/v2-car-getMasterBrandList.html');
}

/**
 * 获取车系数据
 * @param id 车辆品牌id
 * @return promise
 */
export let getMakeList = (id) =>{
    return sendRequest(`/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`);
}


/**
 * 详情页数据
 * @param detailid 详情id
 * @return promise
 */

export let getDetailList = (id) =>{
    return sendRequest(`/v2-car-getInfoAndListById.html?SerialID=${id}`);
}

/**
 * 详情页数据
 * @param carid 车id
 * @return promise
 */

export let getcarid = (id) =>{
    return sendRequest(`/v2-dealer-alllist.html?carId=${id}&cityId=201`)
}

/**
 * 图片数据
 * @param imgid 图片id
 * @return promise
 */

export let getimgid = (id) =>{
    return sendRequest(`/v2-car-getImageList.html?SerialID=${id}`)
}

// 获取车系目录图片
export let getCategoryImageList = (serid, imgid)=>{
    return sendRequest(`/v2-car-getCategoryImageList.html?SerialID=${serid}&ImageID=${imgid}&Page=1&PageSize=30`)
}