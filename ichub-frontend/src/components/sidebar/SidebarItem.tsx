/********************************************************************************
 * Eclipse Tractus-X - Industry Core Hub Frontend
 *
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the
 * License for the specific language govern in permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
********************************************************************************/

import { useState, JSX } from 'react';
import { ListItemButton, ListItemIcon, ListItemText, List, Divider, ListItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import sidebarElements from '../../tests/payloads/sidebar-elements.json'

import { ExpandLess, ExpandMore, Storefront as StorefrontIcon, Category as CategoryIcon, People as PeopleIcon, Assignment as AssignmentIcon, ArrowRight as ArrowRightIcon } from '@mui/icons-material';

const iconMap: { [key: string]: JSX.Element } = {
  Storefront: <StorefrontIcon />, 
  Category: <CategoryIcon />, 
  Shared: <PeopleIcon />, 
  Status: <AssignmentIcon />
};

interface SidebarItemProps {
  section: typeof sidebarElements[0];
  open: boolean;
}

const SidebarItem = ({ section, open }: SidebarItemProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div>
      <ListItemButton onClick={handleExpand}>
        <ListItemIcon>
          {iconMap[section.icon] || <StorefrontIcon />}
        </ListItemIcon>
        <ListItemText primary={section.title} sx={{ opacity: open ? 1 : 0 }} />
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {expanded && (
        <List component="div" disablePadding>
          {section.subitems.map((item: any) => (
            <ListItem key={item.name} disablePadding sx={{ display: 'block', pl: 1 }}>
              <ListItemButton component={NavLink} to={item.link}>
                <ListItemIcon>
                  <ArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
      <Divider />
    </div>
  );
};

export default SidebarItem;
