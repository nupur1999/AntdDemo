import { Table } from "antd";
import "antd/dist/antd.css";
import { useState, useEffect } from "react";

const TableData = () => {
  const [dataSource, setdataSorce] = useState([]);
  const [filteredData, setfilteredData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setfilteredData(data);
        setdataSorce(data);
      });
  }, []);

  const filterData = (event) => {
    if (event.target.value.length > 2) {
      let newList = dataSource.filter((entry) => {
        return entry.title
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setfilteredData(newList);
    } else {
      setfilteredData(dataSource);
    }
  };

  const columns = [
    {
      title: "UserId",
      dataIndex: "userId",
      key: "1",
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "2",
      sorter: (a, b) => a.title > b.title,
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "3",
      render: (completed) => {
        return <p>{completed ? "complete" : "inProgress"}</p>;
      },
      filters: [
        { text: "completed", value: true },
        { text: "inprogress", value: false },
      ],
      onFilter: (value, record) => {
        return record.completed === value;
      },
    },
  ];
  return (
    <div>
      <h3 style={{display:"inline-block" ,paddingRight:"20px"}}>SearchTitle</h3><input type="text" onChange={filterData}  />
      <Table bordered dataSource={filteredData} columns={columns} />
    </div>
  );
};
export default TableData;
