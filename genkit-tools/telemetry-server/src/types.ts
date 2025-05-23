/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  TraceQueryFilterSchema,
  type TraceData,
} from '@genkit-ai/tools-common';
import * as z from 'zod';

/**
 * Trace store list query schema.
 */
export const TraceQuerySchema = z.object({
  limit: z.coerce.number().optional(),
  continuationToken: z.string().optional(),
  filter: TraceQueryFilterSchema.optional(),
});

/**
 * Trace store list query.
 */
export type TraceQuery = z.infer<typeof TraceQuerySchema>;

/**
 * Response from trace store list query.
 */
export interface TraceQueryResponse {
  traces: TraceData[];
  continuationToken?: string;
}

/**
 * Trace store interface.
 */
export interface TraceStore {
  init(): Promise<void>;
  save(traceId: string, trace: TraceData): Promise<void>;
  load(traceId: string): Promise<TraceData | undefined>;
  list(query?: TraceQuery): Promise<TraceQueryResponse>;
}
