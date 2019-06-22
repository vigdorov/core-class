import React, { ReactElement } from "react";

// Пропсы компонента
interface Props {
  data: any[];
}

const Tbody: React.FC<Props> = props => {
  let rows = props.data.map((item, index) => {
    let row: ReactElement[] = [];

    // Генерим строки
    for (let name in item) {
      // Генерим ячейки для строк
      if(item.hasOwnProperty(name)) {
        row.push(<td key={name + index}>{item[name]}</td>);
      }
    }
    return <tr key={index}>{row}</tr>;
  });

  return <tbody>{rows}</tbody>;
};

export default Tbody;
