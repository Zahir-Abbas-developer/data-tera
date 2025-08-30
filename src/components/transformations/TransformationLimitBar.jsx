import React from 'react';
const TransformationLimitBar = ({ used, total }) => (
  <div className="w-full text-gray-400 text-xs font-normal px-2 py-1">
  Transformations left: <span className="text-white font-medium">{used}</span> of <span className="text-white font-medium">{total}</span>
</div>

);
export default TransformationLimitBar; 