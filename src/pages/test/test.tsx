import React, { useEffect, useState } from 'react';

//css
import styles from "./test.module.scss"
import { Dropdown, DropdownItem } from '@src/components';

const TestPage = () => {
    const dropdownItems : DropdownItem[] = [
        {
            label: "test",
            onClick: () => console.log("test"),
            subItems: [
                {
                    label: "test",
                    onClick: () => console.log("test"),
                },
                {
                    label: "test",
                    onClick: () => console.log("test"),
                }
            ]
        },
        {
            label: "test",
            onClick: () => console.log("test"),
            subItems: [
                {
                    label: "test",
                    onClick: () => console.log("test"),
                },
                {
                    label: "test",
                    onClick: () => console.log("test"),
                    subItems: [
                        {
                            label: "test",
                            onClick: () => console.log("test"),
                        },
                        {
                            label: "test",
                            onClick: () => console.log("test"),
                        }
                    ]
                }
            ]
        }
    ]

    return (
        <div className = {`row section`}>
            <div className = {`${styles.container} col l-12 m-12 c-12`}
                data-aos="zoom-in">
                    <Dropdown
                        label = "test dropdown"
                        items={dropdownItems}
                    />
            </div>
        </div>
    )
}

export default TestPage
