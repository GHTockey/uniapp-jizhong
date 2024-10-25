import path from 'path';

const resolve = (p)=>{
	return path.resolve(__dirname, p);
};

module.exports = {
  resolve
}