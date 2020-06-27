import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements OnInit {
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();

  constructor(private _service: CommonService) {
    
  }

  ngOnInit() {
    
    this._service.getTreeJson().subscribe(
      resData => {
        // console.log(resData);
        this.dataSource.data = [resData['entity']['nodeStandardMetadata']];
      }
    )
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
}
