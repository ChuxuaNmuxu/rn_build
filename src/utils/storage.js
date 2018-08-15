import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: null,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是在任何时候，直接对storage.sync进行赋值修改
  // sync: (err) => {
  //   console.log(`${err}没有找到数据或数据过期`);
  // },
});


/**
 * 有了这个sync方法，以后再调用storage.load时，
 * 如果本地并没有存储相应的token，那么会自动触发storage.sync.token进行后续操作
 * @example
 * storage.load({
 *  key: token,
 * }).then(...)
 */
// storage.sync = {
//   token(params) {
//     console.log('token:', params);
//   },
// };

/**
 * @param @requires {object} err 错误对象
 */
const fail = (err) => {
  // 如果没有找到数据且没有sync方法，
  // 或者有其他异常，则在catch中返回
  switch (err.name) {
    case 'NotFoundError':
      throw new Error(err);
    case 'ExpiredError':
      console.error(err.name);
      break;
    default:
      console.error(err);
  }
};

/**
 * 使用key来保存数据（key-only）。这些数据一般是全局独有的，需要谨慎单独处理的数据
 * 批量数据请使用key和id来保存(key-id)，具体请往后看
 * 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
 * /

/**
 * 查询缓存 对react-native-storage 通过key和key-id获取数据的封装，如果传入id则表示通过key-id查询数据
 * @param @requires {string} key 注意:请不要在key中使用_下划线符号!
 * @param {boolean} autoSync autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
 * @param {string} id 使用key-id查询数据时需要传入id
 * syncInBackground(默认为true)意味着如果数据过期，
 * 在调用sync方法的同时先返回已经过期的数据。
 * 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
 * @param {boolean} syncInBackground
 */
storage.Load = ({
  key,
  id,
  autoSync = false,
  syncInBackground = true,
}) => {
  const datas = {
    key,
    autoSync,
    syncInBackground,

    // 你还可以给sync方法传递额外的参数
    syncParams: {
      extraFetchOptions: {
      // 各种参数
      },
      someFlag: true,
    },
  };
  if (id) datas.id = id;
  return storage
    .load(datas)
  /**
 * 如果找到数据，则在then方法中返回
 * 你只能在then这个方法内继续处理ret数据
 */
    .then(ret => ret)
    .catch(fail);
};

/**
 * 使用key和id来保存数据，一般是保存同类别（key）的大量数据。
 * 所有这些"key-id"数据共有一个保存上限（无论是否相同key）
 * 即在初始化storage时传入的size参数。
 * 在默认上限参数下，第1001个数据会覆盖第1个数据。
 * 覆盖之后，再读取第1个数据，会返回catch或是相应的sync方法。
 */

/**
 * 保存缓存 对react-native-storage 通过key和key-id保存数据的封装，如果传入id则表示通过key-id保存数据
 * @param @requires {string} key 注意:请不要在key中使用_下划线符号!
 * @param @requires {object} data 要保存的数据
 * @param {string} id 使用key-id查询数据时需要传入id
 * @param {null || number} expires 过期时间，如果不指定过期时间，则会使用defaultExpires参数，如果设为null，则永不过期
 */
storage.Save = ({
  key,
  data,
  id,
  expires = 1000 * 3600,
}) => {
  const datas = {
    key, // 注意:请不要在key中使用_下划线符号!
    data,
    expires,
  };

  if (id) datas.id = id;
  return storage
    .save(datas)
    .catch(fail);
};

/**
 * 获取某个key下的所有id(仅key-id数据)
 * @param {string} key
 */
storage.GetIdsForKey = key => storage
  .getIdsForKey(key)
  .then(ids => ids)
  .catch(fail);

/**
 * 获取某个key下的所有数据(仅key-id数据)
 * @param {string} key
 */
storage.GetAllDataForKey = key => storage
  .getAllDataForKey(key)
  .then(users => users)
  .catch(fail);

/**
 * 注意：清除某个key下的所有数据(仅key-id数据)
 * @param {string} key
 */
storage.ClearMapForKey = key => storage
  .clearMapForKey(key)
  .catch(fail);

/**
 * 删除单个数据
 * @param {string} key
 * @param {string} id
 */
storage.Remove = (key, id) => {
  const datas = {
    key,
  };
  if (id) datas.id = id;
  return storage
    .remove(datas)
    .catch(fail);
};

export default storage;
