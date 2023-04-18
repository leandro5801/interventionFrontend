import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';

import styles from '../styles/Home.module.css'

const DropdownMenu = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button className="bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
            {selectedOption ? selectedOption.label : 'Seleccionar'}
            <svg
              className="fill-current h-4 w-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Menu.Button>

          <Transition
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {options.map((option) => (
                  <Menu.Item key={option.value}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } block px-4 py-2 text-sm w-full text-left`}
                        onClick={() => handleSelect(option)}
                      >
                        {option.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default DropdownMenu;