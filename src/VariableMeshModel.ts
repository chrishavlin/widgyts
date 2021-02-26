import { DOMWidgetModel, ISerializers } from '@jupyter-widgets/base';
import { VariableMesh } from '@data-exp-lab/yt-tools';
import { MODULE_NAME, MODULE_VERSION } from './version';
import {
  _yt_tools,
  serializeArray,
  arrayDeserializerFactory,
  ArraySerializers
} from './widgyts';

/*
 * We have this as we can potentially have more than one FRB for a variable mesh
 *
 */

export class VariableMeshModel extends DOMWidgetModel {
  defaults(): any {
    return {
      ...super.defaults(),
      _model_name: VariableMeshModel.model_name,
      _model_module: VariableMeshModel.model_module,
      _model_module_version: VariableMeshModel.model_module_version,
      px: null,
      pdx: null,
      py: null,
      pdy: null,
      val: null,
      variable_mesh: null
    };
  }

  initialize(attributes: any, options: any): void {
    super.initialize(attributes, options);
    _yt_tools.then(yt_tools => {
      this.variable_mesh = new yt_tools.VariableMesh(
        this.get('px'),
        this.get('py'),
        this.get('pdx'),
        this.get('pdy'),
        this.get('val')
      );
    });
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    px: {
      serialize: serializeArray,
      deserialize: arrayDeserializerFactory<Float64Array>(Float64Array)
    },
    pdx: ArraySerializers.float64,
    py: ArraySerializers.float64,
    pdy: ArraySerializers.float64,
    val: ArraySerializers.float64
  };

  px: Float64Array;
  pdx: Float64Array;
  py: Float64Array;
  pdy: Float64Array;
  val: Float64Array;
  variable_mesh: VariableMesh;

  static model_name = 'VariableMeshModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
}
