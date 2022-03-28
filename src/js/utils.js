export const debounce = (func, wait) => {
  let timer;
  return function () {
    let context = this; // 注意 this 指向
    let args = arguments; // arguments中存着e

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

export const formatDate = (date, fmt="YYYY-mm-dd HH:MM:SS") => {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
};

export const defaultOptions = {
  yyj: [
    {
      name: "将军一路银杏街",
      stopId: "027-328"
    },
    {
      name: "金银潭大道地铁金银潭站",
      stopId: "027-1074"
    },
    {
      name: "姑嫂树路长港路",
      stopId: "027-280"
    },
    {
      name: "和谐大道姑嫂树路",
      stopId: "4201001035087098597871616"
    },
    {
      name: "将军路将军一路",
      stopId: "4201001119040944658976768"
    }
  ]
};
