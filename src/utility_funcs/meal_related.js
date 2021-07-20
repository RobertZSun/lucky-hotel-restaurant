const baseUrl = "your realtime database base url"

async function checkCuisine(cuisine) {
    let allCuisines;
    let result = {existedId: false, cuisineDishes: {}};
    const urlToFetch = `${baseUrl}/allMeals.json`;
    try {
        const response = await fetch(urlToFetch, {method: 'get'}); // signal: signal
        if (!response.ok) {
            throw new Error("请求所有菜系大类失败！");
        }
        allCuisines = await response.json();
        console.log(allCuisines);

        if (!allCuisines) {
            console.log("菜系大类为空！");
            // controller.abort();
            result.existedId = false;
            // return Promise.reject("empty");
        } else {
            console.log("菜系大类不不不不不为空！");
            console.log(allCuisines);
            for (const [key, value] of Object.entries(allCuisines)) {
                if (value.cuisine === cuisine) {
                    result.existedId = key;
                    result.cuisineDishes = value.dishes;
                    break;
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
    return Promise.resolve(result);
}

async function createCuisines(cuisineName) {
    const urlToFetch = `${baseUrl}/allMeals.json`;
    const fetchConfig = {
        method: 'POST',
        body: JSON.stringify({
            cuisine: cuisineName,
        }),
        headers: {'Content-type': 'application/json'}
    };
    let cuisineId;
    try {
        const response = await fetch(urlToFetch, fetchConfig);
        if (!response.ok) {
            throw new Error("创建菜系大类失败！【fetch获得response阶段失败】");
        }
        const responseData = await response.json();
        console.log(responseData);
        cuisineId = responseData.name;
    } catch (error) {
        console.error(error);
    }
    return Promise.resolve(cuisineId);
}

async function checkDish(cuisineInfo, dishName) {
    let {cuisineDishes: allDishes} = cuisineInfo;
    let result = false;
    if (allDishes) {
        for (const [key, value] of Object.entries(allDishes)) {
            if (value.name === dishName) {
                result = key;
                break;
            }
        }
    }
    return Promise.resolve(result);
}

async function addDish(cuisineId, dishInfo) {
    let urlToPost = `${baseUrl}/allMeals/${cuisineId}/dishes.json`;
    let fetchConfig = {
        method: 'POST',
        body: JSON.stringify(dishInfo),
        headers: {'Content-type': 'application/json'}
    };
    let responseData;
    try {
        const response = await fetch(urlToPost, fetchConfig);
        if (!response.ok) {
            throw new Error('发送菜品中途失败！【fetch response第一环节】');
        }
        responseData = await response.json();
        responseData = responseData.name;
    } catch (e) {
        console.log(e.message);
        throw new Error(`添加新菜品- ${dishInfo} -失败！ 【全局阶段】`);
    }
    return Promise.resolve(responseData);
}

async function delDish(cuisineId, dishID) {
    let urlToPost = `${baseUrl}/allMeals/${cuisineId}/dishes/${dishID}.json`;
    let fetchConfig = {
        method: 'DELETE',
    };
    try {
        const response = await fetch(urlToPost, fetchConfig);
        if (!response.ok) {
            throw new Error('删除菜品中途失败！【fetch response第一环节】');
        }
        console.log(response);
    } catch (e) {
        console.log(e.message);
        throw new Error(`删除菜品- ${dishID} -失败！ 【全局阶段】`);
    }
    return Promise.resolve(null);
}

export {
    checkCuisine,
    createCuisines,
    checkDish,
    addDish,
    delDish
};